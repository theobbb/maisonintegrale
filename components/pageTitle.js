
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { QueryContext } from '@/utils/context';
import { linkPaths } from '@/utils/linkPaths';
import Head from 'next/head';

const base = 'Maison Intégrale'

export default function PageTitle () {

    const { asPath, route, locale } = useRouter();

    const queries = useContext(QueryContext)

    const [pageTitle, setPageTitle] = useState(base)
    const [params, setParams] = useState([base])

    function getStaticParam(path) {
        const param = linkPaths[locale].find(link => link.name.slice(1) == path)?.title
        return format(param)
    }
    const getQueryParam = (path) => {
        const param = queries?.find(project => project.slug[locale].current == path)?.name[locale]
        return format(param)
    }

    const format = (param) => {
        if (!param) return null
        let formatted = param
        formatted = formatted.split('-').join(' ')
        formatted = formatted.toLowerCase()
        formatted = formatted.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        return formatted
    } 
    useEffect(() => {

        let paths = asPath.split('/').slice(1).map(path => {
            if (path.includes('#')) return path.split('#')[0]
            else return path

        })
        
        if (route == '/') return setParams([base])
        if (route == '/404') return setParams(['404', base])

        if (paths.length == 1) return setParams([getStaticParam(paths[0]), base])
        if (paths.length == 2) return setParams([getQueryParam(paths[1]), getStaticParam(paths[0]), base])

    }, [asPath, queries])



    useEffect(() => {
        setPageTitle(params.join(' | '))
    }, [params])

    return <Head><title>{pageTitle}</title></Head>
}

