import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'


export default function NotFound() {

    const {locale} = useRouter();

    const layout = useContext(LayoutContext);

  return (
    <Box sx={{px: layout.spacingX, py: layout.spacingY}}>
        <Typography variant='h2'>
            404 - {locale == 'fr'? 'Page non trouvée':'Page not found'}
        </Typography>

        
    </Box>

  )
}
