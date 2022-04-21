import {useState, useEffect, createContext} from 'react'
import axios from 'axios';

const NoticiasContext = createContext();

const NoticiasProvider = ({children}) => {

    const [categoria, setCategoria] = useState('general');
    const [noticias, setNoticias] = useState([])
    const [paginas, setPaginas] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)
  
    useEffect(() => {
      const consultarAPI = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apikey=${import.meta.env.VITE_API_KEY}`
  
        const { data } = await axios(url)
        setNoticias(data.articles)
        setTotalNoticias(data.totalResults)
        setPaginas(1)
      }
      consultarAPI()
    }, [categoria])

    useEffect(() => {
        const consultarAPI = async() => {
          const url = `https://newsapi.org/v2/top-headlines?country=mx&page=${paginas}&category=${categoria}&apikey=${import.meta.env.VITE_API_KEY}`
    
          const { data } = await axios(url)
          setNoticias(data.articles)
          setTotalNoticias(data.totalResults)
        }
        consultarAPI()
      }, [paginas])

    const handelChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handleChangeNoticias = (e, valor) => {
        setPaginas(valor)
    }

    return (
        <NoticiasContext.Provider
            value={{
                categoria,
                handelChangeCategoria,
                noticias,
                totalNoticias,
                handleChangeNoticias,
                paginas
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext 