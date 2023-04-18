
import { Box, ButtonBase, IconButton, ImageList, ImageListItem, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { AnimatePresence, motion } from 'framer-motion'
import { client } from '@/utils/sanityClient'
import { useContext } from 'react';
import { LinkDirectionContext } from '@/components/layout';
import Block from '@/components/sanity/block';
import PageTransition from '../pageTransition';
import PlaceHolder from '../placeHolder';
import GridViewIcon from '@mui/icons-material/GridView';

const transition = { ease: [0.43, 0.13, 0.23, 0.96] };

function Single ({data, slug, othersExited, setOthersExited, animating, setAnimating, exiting, setExiting, singleToSingle}) {



    const router = useRouter()

    const { locale } = useRouter();

    const [single, setSingle] = useState(null)

    useEffect(() => {
        const newSingle = data.find(single => single.slug[locale].current == slug)
        setSingle(newSingle)
    }, [slug])



//console.log(single)
    //const [exiting, setExiting] = useState(false)
/*
    useEffect(() => {
        if (router.asPath != '/projets' && router.asPath != '/work') return
        setExiting(true)
        
    }, [router.asPath])*/

    const [linkDirection, setLinkDirection] = useState(1)

    function handlePrev() {
        
        if (single?.previous?.slug == null) return
        setLinkDirection(-1)
        handlePush(single.previous.slug)
        /*
        const prevIndex = maisonIndex === 0 ? lastIndex : maisonIndex - 1;
        handlePush(prevIndex)*/
    }
    function handleNext() {
        if (single?.next?.slug == null) return
        setLinkDirection(1)
        handlePush(single.next.slug)
        /*
        const nextIndex = maisonIndex === lastIndex ? 0 : maisonIndex + 1;
        handlePush(nextIndex)*/
    }

    function handlePush(slug) {
        const href = `${router.locale == 'fr'? '/projets':'/work'}/${slug}`;
        
        router.push(href, href, {locale})
    }

    function handleGridView() {
        const href = `${router.locale == 'fr'? '/projets':'/work'}`;
        router.push(href, href, {locale})
    }
    

    const [animationComplete, setAnimationComplete] = useState(false);

    const [layoutAnimating, setLayoutAnimating] = useState(false);


    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));


    function handleOthersExit (index) {
        if (exiting) {
            
            setExiting(false)
        }
        //setAnimationComplete(true)
    }

    
    const textZoneVisible = !animating && !animationComplete && !exiting;

    return single&& (
        
        
        <Box           //initial={{x: `${120}vw`}}
    //animate={{x: exiting? `${-1*120}vw`:0}}
    //exit={{x: `${-1*120}vw`}}
    //transition={{1: 0.5, ease: 'easeInOut'}}
        //component={motion.div}
        sx={{minHeight: '110vw'}}>
            <Box sx={{px: 2}}
            exit={{opacity: 0}}
            
            >
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton sx={{marginRight: 1}} onClick={handleGridView}>
                        <GridViewIcon />
                    </IconButton>
                
                <Box sx={{ display: 'flex', paddingBottom: 3}}>
                    <IconButton sx={{marginRight: 1}} onClick={handlePrev}>
                        <NavigateBeforeIcon />
                        
                    </IconButton>
                    <IconButton onClick={handleNext}>
                        <NavigateNextIcon  />
                    </IconButton>
                </Box>
                </Box>
            
            
            <Box 
            
            sx={{
                py: 0, 
                flexDirection: matchDownLG? 'column': 'row',
                display: 'flex', position: 'relative', overflow: 'visible'}}>
                
               
                <Box 
                //initial={{opacity: 0}}
                //animate={{opacity: !exiting?1:0}}
                //exit={{opacity: 0}}
                component={motion.div}
                sx={{maxWidth: '400px', paddingRight: 4, flex: 1}}
                >
                    
                       
                        
                    

                    
                        <Typography variant='h3'>
                            {single.name[locale]}
                        </Typography>
                    

                    
                    
                    
                    <Box sx={{marginTop: 3}}>
                        
                            <Block variant='body2' sx={{opacity: 0.86}}>
                                {single.top[locale]}
                            </Block>
                        
                        
                    </Box>
                  
                    <Box sx={{marginTop: 3}}>
                        
                            <Block sx={{typography: { sm: 'body2', md: 'body1', lg: 'body0' } }}>
                                {single.body[locale]}
                            </Block>
                        
                        
                    </Box>
                </Box>
                
                <Box sx={{position: 'relative', overflow: 'visible'}}>
              
                    <ImageList variant="masonry" cols={matchDownXL? 1:2} sx={{position: 'relative', overflow: 'visible'}}>
                     
                        {single.imgs.map((img, index) => (
                            <ImageListItem key={img._key}>
                                
                                
                                <motion.div 
                                
                                    layoutScroll
                                    transition={{transition: 'ease', duration: 0.6}}
                                    layoutId={index == 0 && img._key} 
                                    initial={() => {
                                        if (index != 0 || singleToSingle) return {opacity: 0}
                                        
                                    }}
                                    animate={() => {
                                        if (index != 0) {
                                            if (exiting || animationComplete) {
                                                return {opacity: 0}
                                            } else {
                                                return {opacity: 1}
                                            }
                                        } else {
                                            //if (singleToSingle) return {opacity: 1}
                                            if (exiting && router.query.dynamic.length == 2)
                                            return {opacity: 0}
                                            else {
                                                return {opacity: 1}
                                            }
                                        }
                                        
                                    }}
                                        //index != 0 && !exiting && animationComplete ? 
                                        //{y: 0, opacity: 1} :
                                        //{y: '100%', opacity: 0}}
                                    //{y: animationComplete? 0:'100%', opacity: animationComplete? 1:0}}
                                    //exit={{y: '100%', opacity: 0}}
                                    
                                    onLayoutAnimationStart={()=> setAnimationComplete(true)}
                                    onLayoutAnimationComplete={() => setAnimationComplete(false)}
                                    //onLayoutAnimationComplete={() => setAnimationComplete(true)}
                                    onAnimationComplete={()=> handleOthersExit(index)}
                                    >
                                        <img
                                        src={img.url}
                                        style={{maxWidth: '100%', maxHeight: '100%'}}
                                        //srcSet={img.url}
                                        alt={img}
                                        loading="lazy"
                                        />
                                </motion.div>

                                
                            
                            </ImageListItem>
                        ))}
                        
                        
                    </ImageList>
                </Box>
            </Box>
            
            </Box>
        </Box>
        
      

    )
}





export default Single