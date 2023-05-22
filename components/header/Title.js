import React, { useEffect, useState } from 'react'
import NavLink from './navLink'
import { Typography, useMediaQuery, useTheme } from '@mui/material';

export default function Title({drawerOpen}) {

  const theme = useTheme();

  const _sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const _md = useMediaQuery(theme => theme.breakpoints.down('md'));
  const _lg = useMediaQuery(theme => theme.breakpoints.down('lg'));

    const [small, setSmall] = useState(false);

    useEffect(() => {
      if (!_lg) return setSmall(false)
      setSmall(!drawerOpen);
    }, [_lg, drawerOpen])

  return (
    <LinkWrapper link={!_lg}>

        <div style={{display: 'flex'}}>
        {('MAISON INTÉGRALE').split(' ').map((word, index) =>  (
          <div style={{display: 'flex', transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96) .5s',
            ...(index == 1 && small) ? 
              {transform: `translateX(-${_md?_sm? 56: 58:67}px)`, transitionDelay: '0.8s'}:
              {transform: 'translateX(0)', transitionDelay: `${index*0.05 + 0.1}s`}
              
          }}>
            <Word word={word} small={small} key={`title-word-${index}`} />

            <div 
            style={{transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96) .5s', 

            ...(index == 0) ? 
              small ?
              {transform: `translateX(-${_md?_sm? 57: 59:68}px)`, transitionDelay: `0.6s`}:
              {transform: 'translateX(0)', opacity: 0, transitionDelay: `0`}
              :
              small ? 
              {transform: `translateX(-${_md?_sm? 97: 102:117}px)`, transitionDelay: `0.9s`}:
              {transform: 'translateX(0)', opacity: 0, transitionDelay: `0`}
              }}
            >
            <Typography variant={_lg? 'h5':'h6'}>.</Typography>
            </div>

          </div>
        ))}
        </div>
        
    </LinkWrapper>
  )
}

function Word ({word, small}) {

    const [visibleDot, setVisibleDot] = useState(small);
    const _lg = useMediaQuery(theme => theme.breakpoints.down('lg'));
    useEffect(() => {
      setVisibleDot(small)
    }, [small])

    return (
        
            <>
            {word.split('').map((letter, index) => (

              <div style={{overflow: 'hidden'}} key={`title-letter-${index}`}>
                <div
                style={{transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96) .5s', 
                ...(index == 0 || !small) ? 
                  {transform: 'translateX(0)', transitionDelay: `${index*0.05 + 0.5}s`}:
                  {transform: 'translateX(-400%)', transitionDelay: `${(word.length - index) *0.05}s`}
                }}
                >
                <Typography sx={{typography: {xs: 'h5', lg: 'h6'}}}>{letter}</Typography>
                

                </div>
              </div>
            ))}
            
           
</>
          
    )
}

function LinkWrapper ({link, children}) {
  return !link? children : (
    <NavLink href='/'    
    text='MAISON INTÉGRALE' 
    sx={{position: 'relative', 
    whiteSpace: 'nowrap',
    }} 
    index={0}>
      {children}
    </NavLink>
  )
}
