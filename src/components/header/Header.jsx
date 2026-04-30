import { Link, NavLink, useLocation } from "react-router-dom";
import styles from './Header.module.css';
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SearchIcon from "../../CustomIcons/SearchIcon";
import BellIcon from "../../CustomIcons/BellIcon";
import Container from "../Container/container";
const Header = ({ isHomeSidebarOpen, setIsHomeSidebarOpen }) => {
    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [newNotification, setNewNotification] = useState(true)
    const location = useLocation();
    const isMobile = useMediaQuery({ query: '(max-width: 880px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 880px)' })
    const showHomeSidebarButton = ["/", "/profile", "/dashboard", "/setting"].includes(location.pathname) && isTabletOrMobile;
    const todayNotifications = [
        {
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2h'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2h'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2h'
        }
    ]
    const thisWeekNotifications = [
        {
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2d'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2d'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2d'
        }
    ]
    const openNotification = () => {
        setIsOpenNotification(!isOpenNotification);
        setNewNotification(false);
    }

    return (
        <div className={styles.header}>
            {showHomeSidebarButton && isHomeSidebarOpen ? (
                <div
                    className={styles.sidebarOverlay}
                    onClick={() => setIsHomeSidebarOpen(false)}
                />
            ) : null}
            {showHomeSidebarButton ? (
                <aside className={`${styles.mobileSidebar} ${isHomeSidebarOpen ? styles.open : ""}`}>
                    <div className={styles.mobileSidebarHeader}>
                        <b>Quick Access</b>
                        <button
                            className={styles.sidebarCloseBtn}
                            onClick={() => setIsHomeSidebarOpen(false)}
                            aria-label="Close sidebar"
                        >
                            x
                        </button>
                    </div>
                    <nav className={styles.mobileSidebarNav}>
                        <Link to="/" onClick={() => setIsHomeSidebarOpen(false)}>Home</Link>
                        <Link to="/dashboard" onClick={() => setIsHomeSidebarOpen(false)}>Dashboard</Link>
                        <Link to="/setting" onClick={() => setIsHomeSidebarOpen(false)}>Settings</Link>
                        <Link to="/profile" onClick={() => setIsHomeSidebarOpen(false)}>Edit Profile</Link>
                    </nav>
                    <div className={styles.mobileSidebarNotifications}>
                        <h4>Notifications</h4>
                        <p className={styles.mobileSidebarSubtitle}>You have updates from today and this week.</p>

                        <p className={styles.mobileSidebarGroupTitle}>Today</p>
                        {todayNotifications.map((today, index) => (
                            <div key={`today-${today.name}-${index}`} className={styles.mobileNotificationItem}>
                                <img src={today.img} alt="" />
                                <p>
                                    <span>{today.name}</span> {today.type} <small>{today.time}</small>
                                </p>
                            </div>
                        ))}

                        <p className={styles.mobileSidebarGroupTitle}>This week</p>
                        {thisWeekNotifications.map((item, index) => (
                            <div key={`week-${item.name}-${index}`} className={styles.mobileNotificationItem}>
                                <img src={item.img} alt="" />
                                <p>
                                    <span>{item.name}</span> {item.type} <small>{item.time}</small>
                                </p>
                            </div>
                        ))}
                    </div>
                </aside>
            ) : null}
            <Container>
                <div className={styles.content}>
                    <NavLink to="/" className={styles.logo}>Freelancer platform</NavLink>
                    <nav className={styles["nav-menu"]}>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/setting">Settings</NavLink>
                    </nav>
                    {showHomeSidebarButton ? (
                        <button
                            className={styles.sidebarToggleBtn}
                            onClick={() => setIsHomeSidebarOpen(!isHomeSidebarOpen)}
                            aria-label="Toggle sidebar"
                        >
                            <span className={styles.sidebarIconLine}></span>
                            <span className={styles.sidebarIconLine}></span>
                            <span className={styles.sidebarIconLine}></span>
                        </button>
                    ) : null}
                    {isMobile ? (""):(<div className={styles["nav-bar"]}>
                        <div className={styles.search}>
                            <SearchIcon />
                            <input type="text" placeholder="Search..." />
                        </div>
                        <button onClick={openNotification} className={`${ newNotification? styles['have-messages'] : ''}`}>
                            {/* <img src={`${isOpenNotification? 'notification-active.png': './notification.png'}`} alt="" /> */}
                            <BellIcon active={isOpenNotification}/>
                            {isOpenNotification && (
                                <div className={styles.notifications}>
                                    <h3>Notification</h3>
                                    <p className={styles.subTitle}>You Have 3 <span>Notification</span> Today !</p>
                                    <ul>

                                        <p style={{fontSize: '18px', padding: '16px 0px 0px 0px'}}>Today</p>
                                        {todayNotifications.map((today) => (
                                            <li key={today.name}>
                                                <span className={styles.marker}></span>
                                                <div>
                                                    <img src={today.img} alt="" />
                                                    <p><span style={{color: '#3C97AF'}}>{today.name}</span> {today.type} <span style={{color: '#999999'}}>{today.time}</span></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul>

                                        <p style={{fontSize: '18px', padding: '16px 0px 0px 0px'}}>this week</p>
                                        {thisWeekNotifications.map((today) => (
                                            <li key={today.name} style={{border: 'none', padding: '12px 0px'}}>
                                                <div>
                                                    <img src={today.img} alt="" />
                                                    <p><span style={{color: '#3C97AF'}}>{today.name}</span> {today.type} <span style={{color: '#999999'}}>{today.time}</span></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </button>
                    </div>)}
                </div>
            </Container>
        </div>
    )
}
export default Header;