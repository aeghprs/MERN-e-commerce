import React, { Fragment } from 'react'
import { Route, Redirect, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate();
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    return (
        <>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return  navigate('/login') 

                            
                        }

                        return <Element {...props} />
                    }}
                />
            )}
        </>
    )
}

export default ProtectedRoute