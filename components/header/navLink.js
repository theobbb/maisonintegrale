import { Box, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from './link';
import { linkPaths } from '@/utils/linkPaths';

export default function NavLink({sx, index, drawerOpen, footer, children, ...props}) {

    const theme = useTheme();
    const router = useRouter();

    const [newDirection, setNewDirection] = useState(0);

    function format (path) {
        let newPath = path
        if (!newPath) return ''
        if (newPath.includes('#')) newPath = newPath.split('#')[0]
        if (newPath.includes('?')) newPath = newPath.split('?')[0]
        
        
        return newPath
    }

    useEffect(() => {
        
        if (index == -1) return setNewDirection(0)

        else {
            const currentPathIndex = linkPaths[router.locale].indexOf(
                linkPaths[router.locale].find(path => format(path.name) == format(router.asPath)))
            const newDirection = currentPathIndex == -1? 0: index > currentPathIndex? 1:-1
            
            setNewDirection(newDirection)  
        }
        
        if (drawerOpen) setNewDirection(1);
    }, [router.locale, router.asPath])

   const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(format(props.href) == format(router.asPath))
    }, [router.asPath])

    return (    
        <Box sx={{position: 'relative', ...sx}}>
            <Link {...props} direction={newDirection}>{children}</Link>

            {isSelected && !footer && 
                <Box 
                sx={theme.sx.selected}
                component={motion.div} layoutId={'active-link'}  />
            }
            {isSelected && footer && 
                <Box
                sx={{
                    position: 'absolute', 
                    width: '100%',
                    bottom: '1px', 
                    left: 0, 
                    height: '2px', 
                    background: 'black'
                }}
                component={motion.div}
                layoutId={'active-footer-link'} 
                />
            }
            
        </Box>
    )
}