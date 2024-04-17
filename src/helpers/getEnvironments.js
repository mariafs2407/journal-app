import { Rtt } from "@mui/icons-material"


export const getEnvironments = ()=>{

    import.meta.env;

    return{
        ...import.meta.env
    }
}