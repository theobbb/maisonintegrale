
import Layout from '@/components/layout'
import { Box, Button, Divider, Icon, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useContext, useEffect, useRef } from 'react'
import { LangContext } from '@/utils/context'
import { useRouter } from 'next/router'
import ContactButton from '@/components/contactButton'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';



export async function getStaticProps() {
  const data = null
  return { props: { data: data } }
}

export default function Contact() {

  const { locale } = useRouter();

  const theme = useTheme()

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const data = {
    fr: {
      contact: 'CONTACTEZ',
      name: 'nom',
      phone: 'téléphone',
      send: 'envoyer'
    },
    en: {
      contact: 'CONTACT',
      name: 'name',
      phone: 'phone',
      send: 'send'
    },
  }

  
  return (
    <>


      
          <Box  sx={{py: 0, px: theme.layout.x, py: theme.layout.y, display: 'flex', flexDirection: matchDownLG? 'column':'row', paddingBottom: 12, width: '100%'}}>
            <Box sx={{paddingRight: matchDownLG?0:6, maxWidth: '700px', flex: 1}}>
              <Typography variant='h3'>
                {data[locale].contact} <br/> MAISON INTÉGRALE
              </Typography>

              <Typography variant='h6' sx={{paddingTop: 6, display: 'flex', alignItems: 'center'}}>
                <PersonIcon sx={{marginRight: 1, fontSize: 'inherit'}} />
                Marc Baillargeon
              </Typography>
              
              <Typography variant='h6' sx={{paddingTop: 1, display: 'flex', alignItems: 'center', fontWeight: 700}}>
                <PhoneIcon sx={{marginRight: 1, fontSize: 'inherit'}} />
                450 602 4535
              </Typography>

              <Typography variant='h6' sx={{paddingTop: 4, display: 'flex', alignItems: 'center'}}>
                <LocationOnIcon sx={{marginRight: 1, fontSize: 'inherit'}} />
                Laurentides
              </Typography>
            </Box>

            <Box sx={{flex: 1, maxWidth: '600px', width: '100%', alignSelf: 'flex-end', px: matchDownLG?0:8, paddingTop: matchDownLG?8:0, display: 'flex', flexDirection: 'column'}}>
              <Box sx={{paddingBottom: 2}}>
                <TextField id="name" label={data[locale].name} variant="outlined" sx={{width: '100%'}} />
              </Box>
              <Box sx={{paddingBottom: 2}}>
                <TextField id="email" label='email' variant="outlined" sx={{width: '100%', py: 0}} />
              </Box>
              <Box sx={{paddingBottom: 2}}>
                <TextField id="phone" label={data[locale].phone} variant="outlined" sx={{width: '100%'}} />
              </Box>
              <Box sx={{paddingBottom: 2}}>
                <TextField id="message" label='message' variant="outlined" multiline rows={5} sx={{width: '100%'}} />
              </Box>   
              <Box sx={{alignSelf: 'flex-end'}}>
                <Button variant='contrast' color="secondary" >
                  <Typography variant='h6'>
                  
                    {data[locale].send}
                  </Typography>
                  <Typography variant='h5' sx={{display: 'flex', alignItems: 'center', paddingLeft: 0.5, marginRight: -0.8}}>
                      <ArrowOutwardIcon sx={{fontSize: 'inherit'}} />
                  </Typography>
                </Button>
              </Box>

              
            </Box>
            
            <Box sx={{flex: matchDownXL? 0: 1}} />
            
            
            
          </Box>
        
    </>
  )
}


