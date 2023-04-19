import { linkPaths } from '@/utils/linkPaths';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router'
import Link from './link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '@/utils/sanityClient';



export default function LocaleLink ({sx, index, footer, ...props}) {

    const [newPath, setNewPath] = useState(null)
    
    const router = useRouter();
    
    
    //if (pathIndex != -1) setNewPath(linkPaths[props.locale].paths[pathIndex].href);

    

    useEffect(() => {

        const query = router.query.slug;

        async function getOtherSlug() {
            const projectQuery = `*[_type == "project" && slug[$locale].current == $slug]{
                'otherSlug': slug[$otherLocale].current
              }[0]`
          const result = await client.fetch(projectQuery, { locale: router.locale, slug: query, otherLocale: router.locale == 'fr'? 'en':'fr' })
          const otherBase = router.locale == 'en'? 'realisations':'work'
          const otherPath = `/${otherBase}/${result.otherSlug}`
          
          setNewPath(otherPath) 
          
        
        }

        if (query != null) {
            getOtherSlug();
            //return setNewPath(getOtherSlug())
        }

        if (router.asPath == '/') return setNewPath(`/${props.locale == 'fr'? '': 'en'}`);

        const pathIndex = linkPaths[router.locale].paths.indexOf(linkPaths[router.locale].paths.find(path => path.href == router.asPath));
        if (pathIndex != -1) return setNewPath(linkPaths[props.locale].paths[pathIndex].href);
        
        

      }, [router.query, router.route]);
/*
    if (router.asPath.split('/').length > 2) {
        const maisonPathIndex = maisons.indexOf(maisons.find(maison => maison[router.locale].url == router.query.maison))
        if (maisonPathIndex != -1) newPath = `${props.locale == 'fr'? '/realisations':'/work'}/${maisons[maisonPathIndex][props.locale].url}`;
    }*/


    const isSelected = router.locale == props.locale; 
    
    return (
        <Box sx={sx}>
            <Link {...props} href={newPath} localeLink />
            {footer? isSelected &&
                <Box
                      sx={{position: 'absolute', width: '100%', bottom: '1px', left: 0, height: '2px', background: 'black'}}
                      component={motion.div}
                      layoutId={'active-footer-lang'} 
                      >
                </Box> 
                 : isSelected &&
                <Button 
                      variant='fake' 
                      disableRipple 
                      component={motion.div}
                      layoutId={'active-lang'} 
                      >
                </Button>
            }
        </Box>
    ) 
}