import { Box } from "@mui/material";
import { motion } from "framer-motion";

const transition = { ease: [0.43, 0.13, 0.23, 0.96] };

export default function PageTransition({direction, drawerOpen, children, disabled, pageReady}) {
  
  return disabled?
    <Box 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    component={motion.div}>
      
      {children}
    </Box>
  
   : (
    <Box
    component={motion.div}
    
    initial={{x: `${direction*120}vw`, opacity: pageReady? 1:0}}
    animate={{x: 0, y: pageReady? 0: '100vh', opacity: pageReady? 1:0}}
    exit={{x: `${-direction*120}vw`}}
    transition={{transition, duration: 0.8}}>
        {children}
    </Box>
  )
}
