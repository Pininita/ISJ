import { useContext } from 'react'
import MeContext from '@/modules/auth/context/MeContext'

export const useMe = () => {
    const me = useContext(MeContext)
    if (!me || Object.keys(me).length === 0) return null;
    return me;
}