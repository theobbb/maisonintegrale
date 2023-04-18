import { motion } from 'framer-motion'
import React from 'react'

export default function GridImg({src, index}) {
  return index == 0? (                    
    
        <motion.div 
        
        layoutScroll layout
        transition={{transition: 'ease', duration: 30}}
        layoutId={`maison-main-img-${index}`} 
        //onLayoutAnimationComplete={() => setAnimationComplete(true)}
        >
            <Img src={src} />
        </motion.div>
    ) : (
        <motion.div 
        layoutId={null}
        //layoutId={index == 0? `maison-main-img-${maisonIndex}`:null} 
        initial={{y: '100%', opacity: 0}}
        animate={{y: 0, opacity: 1}}
        //animate={{y: animationComplete? 0:'100%', opacity: animationComplete? 1:0}}
        exit={{y: '100%', opacity: 0}}
        transition={{transition: 'ease', duration: 0.5}}
            >
            <Img src={src} />
        </motion.div>
    )
}

function Img ({src}) {
    return (
        <img
            //layoutId={index == 0? 'test':null}
            style={{maxWidth: '100%', maxHeight: '700px'}}
            src={src}
            srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={src}
            loading="lazy"
        />
    )
}
