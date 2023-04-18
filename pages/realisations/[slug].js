
import { Box, ButtonBase, IconButton, ImageList, ImageListItem, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { motion } from 'framer-motion'
import { client } from '@/utils/sanityClient'
import { useContext } from 'react';
import { LinkDirectionContext } from '@/components/layout';
import Block from '@/components/sanity/block';
import GridViewIcon from '@mui/icons-material/GridView';




function Projet ({single}) {

    const router = useRouter()

    const { locale } = useRouter();

    const theme = useTheme();

    
    const { setLinkDirection } = useContext(LinkDirectionContext);

    function handlePrev() {
        
        if (single?.previous?.slug == null) return
        setLinkDirection(-1)
        handlePush(single.previous.slug)
        /*
        const prevIndex = maisonIndex === 0 ? lastIndex : maisonIndex - 1;
        handlePush(prevIndex)*/
    }
    function handleNext() {
        if (single?.next?.slug == null) return
        setLinkDirection(1)
        handlePush(single.next.slug)
        /*
        const nextIndex = maisonIndex === lastIndex ? 0 : maisonIndex + 1;
        handlePush(nextIndex)*/
    }

    function handlePush(slug) {
        const href = `${router.locale == 'fr'? '/projets':'/work'}/${slug}`;
        
        router.push(href, href, {locale})
    }
    function handleGridView() {
        const href = `${router.locale == 'fr'? '/projets':'/work'}`;
        router.push(href, href, {locale})
    }

    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    const [animationComplete, setAnimationComplete] = useState(false);

    //console.log(single)

    return single && (
        <>

        {matchDownMD && 
        <Box sx={{position: 'absolute', right: 0, top: 0, zIndex: 20}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton sx={{marginRight: 1}} onClick={handleGridView}>
                        <GridViewIcon />
                    </IconButton>
                
                <Box sx={{ display: 'flex', paddingBottom: 3}}>
                    <IconButton sx={{marginRight: 1}} onClick={handlePrev}>
                        <NavigateBeforeIcon />
                        
                    </IconButton>
                    <IconButton onClick={handleNext}>
                        <NavigateNextIcon  />
                    </IconButton>
                </Box>
                </Box>
        </Box>
        }

        <Box sx={{minHeight: '110vw', position: 'relative'}}>
        {matchDownMD &&
                <Box>
                <Img img={single.imgs[0]} index={0} key={`top-${single.imgs[0]._key}`} top />
                </Box>
                }
            <Box sx={{px: matchDownMD?2:4, width: '100%', borderRadius: 4, background: theme.palette.background.default, marginTop: matchDownMD&& -6, zIndex: 10, position: 'relative'}}
            exit={{opacity: 0}}
            >
            
                {!matchDownMD && <Box sx={{ display: 'flex', paddingBottom: 3}}>
                    <IconButton variant='outlined' sx={{marginRight: 1}} onClick={handlePrev}>
                        <NavigateBeforeIcon />
                        
                    </IconButton>
                    <IconButton variant='outlined' onClick={handleNext}>
                        <NavigateNextIcon  />
                    </IconButton>
                </Box>}
          
            <Box sx={{
                py: 0, 
                flexDirection: matchDownLG? 'column': 'row',
                display: 'flex', position: 'relative'}}>

                
                <Box sx={{minWidth: !matchDownLG&&'450px', paddingRight: 4, flex: 1, marginRight: matchDownMD? 0: 4, position: 'relative', top: 0}}
                //initial={{opacity:0}}
                //animate={{opacity: animationComplete? 1:0 }}
                //component={motion.div} 
                >
                    <Box>
                        <Typography variant='h3' sx={{py: matchDownMD? 2:0}}>
                            {single.name[locale]}
                        </Typography>
                    </Box>
                    
                    <Box sx={{marginTop: 3, marginBottom: 12}}>
                        <Block variant='body2' sx={{opacity: 0.86}}>
                            {single.top[locale]}
                        </Block>
                    </Box>
                    <Box sx={{marginTop: 3, paddingBottom: 4}}>
                        <Block variant='p' sx={{paddingBottom: 2}}>
                            {single.body[locale]}
                        </Block>
                    </Box>

                </Box>
                <Box sx={{position: 'relative', overflow: 'visible'}}>
              
                <ImageList variant="masonry"  cols={matchDownXL? 1:2} sx={{position: 'relative', overflow: 'visible'}}>
                        {single.imgs.slice(matchDownLG? 1:0).map((img, index) => (
                            <Img img={img} index={index} key={img._key} />
                        ))}
                    </ImageList>
                </Box>
            </Box>
            </Box>
            
        </Box>
        
      </>

    )
}

function Img ({img, index, top}) {

    const theme = useTheme();

    return (
        <ImageListItem sx={{borderRadius: 0}}>
                            

            
                                
            <Box 
            sx={{position: 'relative', overflow: 'visible', height: top&&'40vh', mx: !top &&1, my: !top &&0.5}}
            component={motion.div}
            transition={{transition: 'ease', duration: 0.5}}
            layoutId={index == 0? `maison-main-img-${img._key}`:null} 
            //onLayoutAnimationComplete={() => setAnimationComplete(true)}
            >
                <img
                src={img.url}
                style={{
                    //minHeight: top&& '20vh',
                    objectFit: 'cover',
                    height: top&&'100%',
                    width: top&&'100%',
                    //width:top&&'100%',
                    maxWidth: !top&&'100%', 
                    maxHeight: !top&&'100%', 
                    borderRadius: top && 0}}
                //srcSet={img.url}
                alt={img}
                loading="lazy"
                />
                {top &&
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(255,255,255,0) 100%)`}}/>}
            </Box>
                                
                                
        </ImageListItem>
    )
}




export async function getStaticPaths() {

    const locales = ["fr", "en"];

    const res = await client.fetch(`*[_type == "project"]`)

    const paths = [];

    res.map((project) => {
        locales.forEach((locale) => {
            const slug = project.slug[locale].current;
            paths.push({ params: { slug }, locale })

        });
        
      });

    return { paths, fallback: false };
  }
  
export async function getStaticProps(context = {}) {
    const { params, locale } = context;
    const query = `*[_type == "project" && slug[$locale].current == $slug]{
        ...,
        'imgs': imgs[]{..., 'url': asset->url},
        "previous": *[_type == "project" && ^.orderRank > orderRank]|order(orderRank desc)[0]{ 
              "slug": slug[$locale].current
        },
        "next": *[_type == "project" && ^.orderRank < orderRank]|order(orderRank asc)[0]{ 
              "slug": slug[$locale].current
        },
      }`
    //const query = `*[_type == "project" && slug.$locale.current == $slug]`

    const single = await client.fetch(query, { locale: locale, slug: params.slug })
    return { props: { single: single[0] } }
}

export default Projet