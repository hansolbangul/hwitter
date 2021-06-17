import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({ refreshUser, isLoggenIn, userObj }) => {
    return (
        <Router>
            {isLoggenIn && <Navigation userObj={userObj} />}
            <Switch>
                <>
                    {isLoggenIn ? (
                        <div
                            style={{
                                maxWidth: 890,
                                width: '100%',
                                margin: '0 auto',
                                marginTop: 80,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Route exact path="/">
                                <Home userObj={userObj} />
                            </Route>
                            <Route exact path="/profile">
                                <Profile userObj={userObj} refreshUser={refreshUser} />
                            </Route>
                            {/* <Redirect from="*" to="/" /> // 리다이랙션을 사용하여 로그아웃시 메인으로 이동  */}
                        </div>
                    ) : (
                        <>
                            <Route exact path="/">
                                <Auth />
                            </Route>
                            {/* <Redirect from="*" to="/" /> */}
                        </>
                    )}
                </>
            </Switch>
        </Router>
    );
};
export default AppRouter;
