import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const transition = { ease: [0.43, 0.13, 0.23, 0.96] };

export default function PageTransition({direction, drawerOpen, children, disableTransition, pageReady}) {

  const router = useRouter();

  const [ready, setReady] = useState(false);
  useEffect(() => {setReady(true)},[])

  if (!ready) return null
  return disableTransition?
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
