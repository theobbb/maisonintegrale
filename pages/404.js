import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react';
import Head from 'next/head'

const meta = {
  title: {
    fr: "404 | Maison Intégrale",
    en: "404 | Maison Intégrale"
  },
}

export default function NotFound() {

    const {locale} = useRouter();

    const theme = useTheme()

  return (
    <>
      <Head>
        <title>{meta.title[locale]}</title>
      </Head>

      <Box sx={{px: theme.layout.x, py: theme.layout.y}}>
          <Typography variant='h2'>
              404 - {locale == 'fr'? 'Page non trouvée':'Page not found'}
          </Typography>

          
      </Box>
    </>
  )
}
