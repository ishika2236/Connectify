import React, { useCallback, useState , useEffect} from 'react'
import { useRef} from 'react';

const useStatewithCallback = (initialState) => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef();

    const updateState = useCallback((newstate, cb)=>{
        cbRef.current = cb;
        setState((prev)=>{
            return typeof newstate === 'function' ? newstate(prev) : newstate;
        })
    },[])
    useEffect(() => {
        if(cbRef.current)
        {
            cbRef.current(state);
            cbRef.current = null;
        }
      
    }, [state])
    
    return [state, updateState];
}
export default useStatewithCallback