import Layout from '@/components/layout'
import { maisons } from '@/utils/maisons'
import { Box, ButtonBase, IconButton, ImageList, ImageListItem, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { motion } from 'framer-motion'
import GridImg from './gridImg'



function Maison ({maison}) {

    const router = useRouter()

    const { locale } = useRouter();

    if (!maison) router.push('/404', '/404');

    //if (!query.maison) return null;

    /*
    const [maison, setMaison] = useState(null);

    

    const maisonIndex = maisons.indexOf(maisons.find(maison => maison[locale].url == router.query.maison));
    const lastIndex = maisons.length - 1;*/

    /*
    useEffect(() => {
        if (maisonIndex == -1) return;
        const newMaison = maisons[maisonIndex];
        setMaison({...newMaison[locale], imgs: newMaison.imgs})
    }, [maisonIndex])*/

    const maisonIndex = maison.index;
    const lastIndex = maisons.length - 1;

    function handlePrev() {
        const prevIndex = maisonIndex === 0 ? lastIndex : maisonIndex - 1;
        handlePush(prevIndex)
    }
    function handleNext() {
        const nextIndex = maisonIndex === lastIndex ? 0 : maisonIndex + 1;
        handlePush(nextIndex)
    }

    function handlePush(index) {
        const href = `${router.locale == 'fr'? 'projets':'work'}/${maisons[index][router.locale].url}`;
        console.log(href)
        router.push(href, href, {locale: router.locale})
    }

    const [animationComplete, setAnimationComplete] = useState(false);

    //console.log(maison)

    return (
        <>

       
        <Box sx={{minHeight: '110vw'}}>
            <Box sx={{px: 2}}
            exit={{opacity: 0}}
            >
                <Box sx={{ display: 'flex', paddingBottom: 3}}>
                    <IconButton sx={{marginRight: 1}} onClick={handlePrev}>
                        <NavigateBeforeIcon />
                        
                    </IconButton>
                    <IconButton onClick={handleNext}>
                        <NavigateNextIcon  />
                    </IconButton>
                </Box>
          
            <Box sx={{py: 0, display: 'flex', position: 'relative', overflow: 'visible'}}>
            
                <Box sx={{maxWidth: '400px', paddingRight: 4, flex: 1}}
                initial={{opacity:0}}
                animate={{opacity: animationComplete? 1:0 }}
                component={motion.div} >
                    <Box>
                    
                        <Typography variant='h3' sx={{}}>
                            {maison.name[locale]}
                        </Typography>
                    
                    </Box>
                    <Box sx={{marginTop: 3}}>
                        {/*maison.body1.map((item, index) => (
                        <Typography key={`body1-${index}`} variant='body2' sx={{opacity: 0.86}}>
                            {item}
                        </Typography>
                        ))*/}
                    </Box>
                    <Box sx={{marginTop: 3}}>
                        {/*maison.body2.map((item, index) => (
                        <Typography key={`body2-${index}`} variant='body2' sx={{opacity: 0.86}}>
                            {item}
                        </Typography>
                        ))*/}
                    </Box>
                    <Box sx={{marginTop: 3}}>
                        {/*maison.body.map((item, index) => (
                        <Box sx={{marginBottom: 3}} key={`body0-${index}`}>
                            <Typography sx={{typography: { sm: 'body2', md: 'body1', lg: 'body0' } }} >
                                {item}
                            </Typography>
                        </Box>
                        ))*/}
                    </Box>
                </Box>
                <Box sx={{position: 'relative', overflow: 'visible'}}>
              
                    <ImageList variant="masonry" cols={2} sx={{position: 'relative', overflow: 'visible'}}>
                        {/*maison.imgs.map((img, index) => (
                            <ImageListItem key={`maison-single-${index}`}>
                            

                            
                                {index == 0? (
                                    <motion.div 
                                    layoutScroll layout
                                     transition={{transition: 'ease', duration: 0.5}}
                                    layoutId={index == 0? `maison-main-img-${maisonIndex}`:null} 
                                    onLayoutAnimationComplete={() => setAnimationComplete(true)}>
                                        <img
                                        src={`/img/maisons/${img}?w=248&fit=crop&auto=format`}
                                        srcSet={`/img/maisons/${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={img}
                                        loading="lazy"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                    
                                    //layoutId={index == 0? `maison-main-img-${maisonIndex}`:null} 
                                    initial={{y: '100%', opacity: 0}}
                                    animate={{y: animationComplete? 0:'100%', opacity: animationComplete? 1:0}}
                                    exit={{y: '100%', opacity: 0}}
                                    transition={{transition: 'ease', duration: 0.5}}
                                     >
                                        <img
                                        
                                        src={`/img/maisons/${img}?w=248&fit=crop&auto=format`}
                                        srcSet={`/img/maisons/${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={img}
                                        loading="lazy"
                                        />
                                    </motion.div>
                                )} 
                                
                            </ImageListItem>
                        ))*/}
                    </ImageList>
                </Box>
            </Box>
            </Box>
        </Box>
        
      </>

    )
}


export default Maison