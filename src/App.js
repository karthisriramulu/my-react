import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./assets/css/style.css";
import Header from "./components/Header";
import routes from "./utils/routes/index";
import firebase from './config/firebase'
import AppContext from "./store/AppContext";
import AuthRoute from "./utils/routes/AuthRoute";
import GuestRoute from "./utils/routes/GuestRoute";
import Loading from "./components/Loading";
import NotFound from "./page/404";
import { AnimatePresence } from "framer-motion";
import AnimatedRoute from "./utils/routes/AnimatedRoute";


function App(){

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        setIsLoading(true);

        firebase.
        auth().onAuthStateChanged(user => {
          if(user) {
            setIsLoggedIn(true);
            setUser(user);
            setIsLoading(false);
          }else{
              setIsLoggedIn(false)
              setUser({});
              setIsLoading(false);
          }
        });
      }, [])

    const location = useLocation();

      if(isLoading) return <Loading />

    return (
        <AppContext.Provider value={[isLoggedIn, user]}>
            <Header />
            <AnimatePresence exitBeforeEnter initial={false} >
            <Switch key={location.pathname} location={location}  > {/* location={location} */}
                {
                    routes.map((route, index) => {

                        if(route.protected === "guest"){
                            
                            return(
                                <GuestRoute 
                                    key={index}
                                    path={route.path} 
                                    exact={route.exact} 
                                >
                                    <route.component />
                                </GuestRoute>
                                
                                )
                        }

                        if(route.protected === "auth"){
                            
                            return(
                                <AuthRoute 
                                    key={index}
                                    path={route.path} 
                                    exact={route.exact} 
                                >
                                    <route.component />
                                </AuthRoute>
                            )
                        }
                            return(
                                <AnimatedRoute 
                                    key={index}
                                    path={route.path} 
                                    exact={route.exact} 
                                >
                                    <route.component />
                    
                                </AnimatedRoute>
                                
                                )
                        
                        
                        }
       
                    )
                }
                
                <Route 
                    path="*" 
                >
                    <NotFound />
                </ Route>
            </Switch>
            </AnimatePresence>
        </AppContext.Provider>
        );
        
    
    }


// class App extends React.Component {

//     // constructor(props){

//     //     console.log("App Constaructor");
//     //     super(props);

//     //     this.state = { title: "Hello React: 2", isShowing:false };
//     // }

//     //states on react immutable

//     handleClick = () => {
//         this.setState({isShowing:!this.state.isShowing})
//     };

//     componentDidUpdate(){
//         console.log("App Updated");
//     }

//     componentDidMount(){

//         console.log("App Mounted");

//         // this.setState({title: "Hello LIfeCycle"});
//     }


//     render(){
//         console.log("App Render");
//         return (
//             <section className="flex justify-center">
//                 <div className="w-1/2">
//                     <div className="text-center">
//                         <div className="my-4">{this.state.title}</div>
//                         <button className="p-1 bg-blue-700 text-white my-2" 
//                         onClick={this.handleClick}>Toggle Image</button>
//                     </div>
//                     {this.state.isShowing ? <Images /> : null}
//                 </div>
//             </section>
//             );
//     }
// }





export default App;