
import { Box, Button, Divider, Icon, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import ContactButton from '@/components/contactButton'
import Sapin from '@/components/sapin'
import { motion } from 'framer-motion'
import PageTransition from '@/components/pageTransition'
import { client } from '@/utils/sanityClient'
import Block from '@/components/sanity/block'
//import Lottie from 'lottie-web'



export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "equipe"]`)
  return { props: { data: data[0] } }
}

export default function Equipe({data}) {


  const { locale, locales, push } = useRouter();

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));



  return (
    <>
      

      
          <Box  sx={{py: 0, px: matchDownLG?matchDownMD? 2:3:4, display: 'flex', paddingTop: 12, flexDirection: matchDownLG? 'column':'row', paddingBottom: 12, width: '100%'}}>
            <Box sx={{flex: 1, px: matchDownLG?0:6, maxWidth: '700px'}}>
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
            <Box sx={{flex: 1, px: matchDownLG?0:8, paddingTop: matchDownLG?16:0, maxWidth: '700px'}}>
              <Typography variant='h4' sx={{}}>
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


