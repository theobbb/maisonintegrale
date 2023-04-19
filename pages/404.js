import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react';


export default function NotFound() {

    const {locale} = useRouter();

    const theme = useTheme()

  return (
    <Box sx={{px: theme.layout.x, py: theme.layout.y}}>
        <Typography variant='h2'>
            404 - {locale == 'fr'? 'Page non trouvée':'Page not found'}
        </Typography>

        
    </Box>

  )
}
