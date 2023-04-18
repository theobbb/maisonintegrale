import Layout from "@/components/layout"
import { maisons } from "@/utils/maisons";
import { Box } from "@mui/material";
import { AnimatePresence, LayoutGroup } from "framer-motion";
//import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import Maison from "../components/work/maison";
import Realisations from "../components/work/realisations";

export default function DynamicCheck({children}) {
    const router = useRouter();

    //const [isDynamic, setIsDynamic] = useState(false)

    const [dynamicMode, setDynamicMode] = useState(null)

    const [single, setSingle] = useState();

    const [animating, setAnimating] = useState(null);

    useEffect(() => {
        const pathArr = router.asPath.split('/');
        const dynamicBase = pathArr[1] == 'realisations' || pathArr[1] == 'work';
        
        if (!dynamicBase || pathArr.length > 3) {
            
            return setDynamicMode(null);
        } 
        if (pathArr.length == 2) {
            if (single != null) setAnimating(single.index)
            return setDynamicMode('grid');
        } 

        const other = maisons.find(maison => maison[router.locale].url == pathArr[2])
        const otherIndex = maisons.indexOf(other);
        if (other.length == -1) return setDynamicMode(null);
        setSingle({...other[router.locale], imgs: other.imgs, index: otherIndex})
        setDynamicMode('single');

    }, [router.asPath])

    console.log(dynamicMode)
return <h1>fdf</h1>
    if (!dynamicMode) return {...children}
    
/*
    else return (
        <>
            
            <LayoutGroup layout layoutRoot>
                {dynamicMode == 'grid' && <Realisations {...{animating, setAnimating}} />  }
                {dynamicMode == 'single' && <Maison maison={single} /> }
            </LayoutGroup>
            </>
    )*/
}
