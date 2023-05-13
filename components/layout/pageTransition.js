import { Box, useMediaQuery } from "@mui/material";
import { useAnimate, usePresence  } from "framer-motion";
import { useEffect, useState } from "react";
import { theme } from "@/styles/theme";

const transition = { ease: [0.43, 0.13, 0.23, 0.96], duration: 0.8 };

export default function PageTransition({children, direction, drawerOpen, disableTransition, pageReady}) {

  const [firstRender, setFirstRender] = useState(false)
  useEffect(() => {setFirstRender(true)}, [firstRender])

  const [isPresent, safeToRemove] = usePresence()
  
  const [page, animate] = useAnimate();

  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

  const scrollRatio = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight) 
  let delay = scrollRatio
  delay = matchDownLG? 0:delay

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
       await animate(page.current, {x: direction != 0 && [`${direction*120}vw`, '0vw'], opacity: [0, 1]}, {...transition, 
        delay: delay+0.4});
       await animate('footer', {x: direction != 0 && [direction*20, 0], opacity: [0, 1]}, {...transition, duration: 0.2, });
      }
      enterAnimation()

    } else {
      const exitAnimation = async () => {
        if (direction != 0)
        await animate('footer', {x: direction != 0 && [0, -direction*20], opacity: [1, 0]}, {...transition, duration: 0.2, });
        await animate(page.current, {x: direction != 0 && ['0vw', `${-direction*120}vw`],  opacity: [1, 0]}, {...transition, delay})
        
        safeToRemove()
      }
      exitAnimation()
    }
  }, [isPresent]);


  return (

    <main ref={page}>
      
        <Box sx={{
          position: 'absolute', 
          width: '100%', 
          top: theme.spacing(6), 
          [theme.breakpoints.down("md")]: {top: theme.spacing(5.5)},
          //[theme.breakpoints.down("sm")]: {top: theme.spacing(5.5)},
          
          minHeight: '100vh',
          left: 0
        }}>

          {firstRender && children }
        </Box>
        
    </main>

  )
}
