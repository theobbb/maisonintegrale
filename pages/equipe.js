
import { Box, Button, Divider, Icon, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import ContactButton from '@/components/contactButton'

import { motion } from 'framer-motion'
import PageTransition from '@/components/layout/pageTransition'
import { client } from '@/utils/sanityClient'
import Block from '@/components/sanity/block'

import Link from 'next/link'
import { useEffect } from 'react'

export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "equipe"]`)
  return { props: { data: data[0] } }
}

export default function Equipe({data}) {

  const theme = useTheme();

  const { locale, locales, push } = useRouter();

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  

  return (
    <>
      

      
          <Box sx={{
            py: 0,  
            px: theme.layout.x, 
            display: 'flex', 
            py: theme.layout.y,
            
            flexDirection: matchDownLG? 'column':'row', 
            
            width: '100%'
            }}>

            <Box sx={{flex: 1, paddingRight: matchDownLG?0:theme.layout.x, maxWidth: '700px'}}>
              <Typography variant='h4' sx={{}}>
                MARISOL SARRAZIN
              </Typography>
              <Typography variant='h6' sx={{}}>
                {data.marisol.titre[locale]}
              </Typography>

              <Block sx={{paddingTop: 5, typography: 'body' }}>
                {data.marisol.body[locale]}
              </Block>
            </Box>
            <Box sx={{flex: 1, paddingTop: matchDownLG && theme.layout.divider, maxWidth: '700px'}}>
              <Typography variant='h4' color={theme.palette.text.primary}>
                MARC BAILLARGEON
              </Typography>
              <Typography variant='h6' sx={{}}>
                {data.marc.titre[locale]}
              </Typography>

              <Block sx={{paddingTop: 5,  typography: 'body' }}>
                {data.marc.body[locale]}
              </Block>

              <Box sx={{display: 'flex', justifyContent: matchDownMD? 'flex-end': 'flex-end', py: 6}}>
                <ContactButton />
              </Box>
            </Box>
            
            
            
          </Box>
        
    </>
  )
}


