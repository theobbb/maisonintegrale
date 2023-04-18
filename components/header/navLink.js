import { Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from './link';
import { linkPaths } from '@/utils/linkPaths';

export default function NavLink({sx, index, drawerOpen, footer, ...props}) {
    const router = useRouter();

    const [newDirection, setNewDirection] = useState(0);

    useEffect(() => {
        if (index == -1) return
        
        if (router.asPath == '/') return setNewDirection(1)


        
        //if (index == 'home') return setNewDirection(-1)
        else {
            const currentPathIndex = linkPaths[router.locale].paths.indexOf(
                linkPaths[router.locale].paths.find(path => path.href == `/${router.asPath.split('/')[1]}`));
            const newDirection = currentPathIndex == -1? 0: index > currentPathIndex? 1:-1
            setNewDirection(newDirection)  
        }
        
        if (drawerOpen) setNewDirection(1);
    }, [router.locale, router.asPath, router.query])

   

    const isSelected = props.href == router.asPath;

    return (    
        <Box sx={{position: 'relative', ...sx}}>
            <Link {...props} direction={newDirection} sx={sx} />
            {footer? isSelected &&
                <Box
                      sx={{position: 'absolute', width: '100%', bottom: '1px', left: 0, height: '2px', background: 'black'}}
                      component={motion.div}
                      layoutId={'active-footer-link'} 
                      >
                </Box> 
                 : isSelected &&
                <Button 
                      variant='fake' 
                      disableRipple 
                      component={motion.div}
                      layoutId={'active-link'} 
                      >
                </Button>
            }
            
        </Box>
    )
}