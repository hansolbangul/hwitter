import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul
                className="nav__ul"
                style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
            >
                <li>
                    <Link
                        to="/"
                        style={{
                            marginRight: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            fontSize: 12,
                        }}
                    >
                        <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="2x" />
                        <span style={{ marginTop: 10, opacity: 1 }}>Hwiter</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/profile"
                        style={{
                            marginLeft: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            fontSize: 12,
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
                        <span style={{ marginTop: 10, opacity: 1 }}>
                            {userObj.displayName ? userObj.displayName : 'No name'}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
