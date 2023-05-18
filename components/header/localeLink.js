import { linkPaths } from '@/utils/linkPaths';
import { Box, Button, useTheme } from '@mui/material';
import { useRouter } from 'next/router'
import Link from './link';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { client } from '@/utils/sanityClient';
import { QueryContext } from '@/utils/context';

export default function LocaleLink ({sx, index, footer, ...props}) {

    const [otherPath, setOtherPath] = useState(null)
    
    const router = useRouter();

    const theme = useTheme();

    const queries = useContext(QueryContext);

    function format (path) {
        let newPath = path
        if (!newPath) return ''
        if (newPath.includes('#')) newPath = newPath.split('#')[0]
        if (newPath.includes('?')) newPath = newPath.split('?')[0]

        return newPath
    }

    useEffect(() => {

        function getOtherQuery() {

            const otherBase = props.locale == 'fr'? 'realisations':'work'

            const otherQuery = queries.find(query => query.slug[router.locale].current == router.query.slug)?.slug[props.locale]?.current
            const otherPath = `/${otherBase}/${otherQuery}`
            setOtherPath(otherPath)
        }



        if (router.query.slug != null) {
            return getOtherQuery();
        }
        if (router.route == '/404') return setOtherPath('/');

        if (router.asPath == '/') return setOtherPath(`/${props.locale == 'fr'? '': 'en'}`);

        const pathIndex = linkPaths[router.locale].indexOf(linkPaths[router.locale].find(path => format(path.name) == format(router.asPath)));
        if (pathIndex != -1) return setOtherPath(linkPaths[props.locale][pathIndex].name);
        
        

      }, [router.asPath, queries]);

    const isSelected = router.locale == props.locale; 
    
    return (
        <Box sx={sx}>
            <Link {...props} href={otherPath} localeLink />
            {footer? isSelected &&
                <Box
                      sx={{
                        position: 'absolute', 
                        width: '100%', bottom: '0px', 
                        left: 0, height: '2px', 
                        background: theme.palette.mode == 'light'? 'rgba(0, 0, 0, 0.8)':'rgba(255, 255, 255, 0.8)',
                        }}
                      component={motion.div}
                      layoutId={'active-footer-lang'} 
                      >
                </Box> 
                 : isSelected &&
                <Box 
                sx={theme.sx.selected}
                component={motion.div} layoutId={'active-lang'}  />
            }
        </Box>
    ) 
}