
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
import Image from 'next/image'
import LazyImage from '@/components/Image';



function Projet ({single}) {

    const router = useRouter()

    const { locale } = useRouter();

    const theme = useTheme();


    const { setLinkDirection } = useContext(LinkDirectionContext);

    function handlePrev() {
        setLinkDirection(-1)
        if (single?.previous?.slug == null) handlePush(single.last.slug)
        else handlePush(single.previous.slug)
    }
    function handleNext() {
        setLinkDirection(1)
        if (single?.next?.slug == null) handlePush(single.first.slug)
        else handlePush(single.next.slug)
    }

    function handlePush(slug) {
        const href = `${router.locale == 'fr'? '/realisations':'/work'}/${slug}`;
        
        router.push(href, href, {locale})
    }
    function handleGridView() {
        const href = `${router.locale == 'fr'? '/realisations':'/work'}`;
        router.push(href, href, {locale})
    }

    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    const [animationComplete, setAnimationComplete] = useState(false);

    //console.log(single)

    return single && (
        <>

        

        <Box sx={{position: 'relative'}}>
        {matchDownMD &&
                <Box>
                <Img img={single.imgs[0]} index={10} key={`top-${single.imgs[0]._key}`} top />
                </Box>
                }
            <Box sx={{
                
                px: {xs: 2, md: 4}, 
                borderRadius: 4, 
                background: theme.palette.background.default, 
                marginTop: matchDownMD? -6:2, 

                zIndex: 10, position: 'relative'}}
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
          
            <Box 
            
            sx={{
                py: 0, 
                width: '100%',
                flexDirection: matchDownLG? 'column': 'row',
                display: 'flex', position: 'relative'
                }}>

                
                <Box id='text' sx={{
                    minWidth: matchDownLG?'100%':'450px', paddingRight: !matchDownLG && 3, flex: 1, marginRight: matchDownMD? 0: 4, position: 'relative', top: 0}}
                >
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant='h3' sx={{py: matchDownMD? 2:0}}>
                            {single.name[locale]}
                        </Typography>
                        {matchDownMD && 
                       
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', py: matchDownMD? 2:0}}>
                                    
                                
                            <Box sx={{ display: 'flex', paddingBottom: 3}}>
                                <IconButton variant='outlined' sx={{marginRight: 1}} onClick={handlePrev}>
                                    <NavigateBeforeIcon />
                                    
                                </IconButton>
                                <IconButton variant='outlined' onClick={handleNext}>
                                    <NavigateNextIcon  />
                                </IconButton>
                            </Box>

                        </Box>
                       
                        }
                    </Box>
                    
                    <Box sx={{marginTop: matchDownLG?0:3, marginBottom: matchDownLG?6:12}}>
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
                <Box sx={{position: 'relative', overflow: 'visible', width: '100%'}}>
              
                    <ImageList variant="masonry"  cols={matchDownXL? 1:2} sx={{position: 'relative', overflow: 'visible', width: '100%'}}>
                        {single.imgs.map((img, index) => (
                            <Img img={img} index={index} key={img._key} />
                        ))}
                    </ImageList>
                </Box>
            </Box>
            </Box>
            {single.imgs.length > 4 && <Box sx={{display: 'flex', px: {xs: 2, md: 3.5}}}>
        
        
       
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', py: matchDownMD? 2:0}}>
                    
                
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', paddingRight: 2}}>
                <IconButton variant='outlined' sx={{marginRight: 1}} onClick={handlePrev}>
                    <NavigateBeforeIcon />
                    
                </IconButton>
                <IconButton variant='outlined' onClick={handleNext}>
                    <NavigateNextIcon  />
                </IconButton>
            </Box>

        </Box>
        <Typography variant='h3' sx={{py: matchDownMD? 2:0}}>
            {single.name[locale]}
        </Typography>
        
    </Box>}
        </Box>
        
      </>

    )
}

function Img ({img, index, top}) {

    const theme = useTheme();

    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

    return (
        <ImageListItem sx={{borderRadius: 0}}>
           
            <Box 
            sx={{
                position: 'relative', 
                overflow: 'visible', 
                height: top&&'30vh', 
                mx: top? 0 : matchDownLG? 0:1, 
                my: !top && 0.5,
            }}
            component={motion.div}
            transition={{transition: 'ease', duration: 0.5}}
            layoutId={index == 0? `maison-main-img-${img._key}`:null} 
            //onLayoutAnimationComplete={() => setAnimationComplete(true)}
            >
                <LazyImage
                src={img.url}
                
                
                
                style={{
                    //minHeight: top&& '20vh',
                    objectFit: 'cover',
                    height: top&&'100%',
                    width: top&&'100%',
                    //width:top&&'100%',
                    maxWidth: !top&&'100%', 
                    maxHeight: !top&&'100%', 
                    borderRadius: 0}}
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
                    
                        }}/>}
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
        "first": *[_type == "project"]|order(orderRank asc)[0]{ "slug": slug[$locale].current },
        "last": *[_type == "project"]|order(orderRank desc)[0]{ "slug": slug[$locale].current }
      }`
    const single = await client.fetch(query, { locale: locale, slug: params.slug })
    return { props: { single: single[0] } }
}

export default Projet
