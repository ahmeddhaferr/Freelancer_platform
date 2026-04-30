import { useState } from "react";
import Card from "../../components/Card/card";
import Container from "../../components/Container/container";
import styles from "./SettingScreen.module.css";

const SettingScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <div className={styles.settingScreen}>
      <Container>
        <div className={styles.content}>
          <section className={styles.mainSection}>
            <Card>
              <div className={styles.header}>
                <h1>Settings</h1>
                <p>Manage your account preferences and app behavior.</p>
              </div>
            </Card>

            <Card marginTop={16}>
              <div className={styles.settingGroup}>
                <h2>Account Settings</h2>
                <div className={styles.settingItem}>
                  <div>
                    <b>Public profile</b>
                    <p>Allow other users to view your profile details.</p>
                  </div>
                  <button
                    className={`${styles.toggleBtn} ${
                      publicProfile ? styles.active : ""
                    }`}
                    onClick={() => setPublicProfile((prev) => !prev)}
                  >
                    {publicProfile ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </Card>

            <Card marginTop={16}>
              <div className={styles.settingGroup}>
                <h2>App Preferences</h2>
                <div className={styles.settingItem}>
                  <div>
                    <b>Notifications</b>
                    <p>Receive updates about projects and messages.</p>
                  </div>
                  <button
                    className={`${styles.toggleBtn} ${
                      notificationsEnabled ? styles.active : ""
                    }`}
                    onClick={() => setNotificationsEnabled((prev) => !prev)}
                  >
                    {notificationsEnabled ? "On" : "Off"}
                  </button>
                </div>

                <div className={styles.settingItem}>
                  <div>
                    <b>Dark mode</b>
                    <p>Use a darker color theme in the interface.</p>
                  </div>
                  <button
                    className={`${styles.toggleBtn} ${
                      darkMode ? styles.active : ""
                    }`}
                    onClick={() => setDarkMode((prev) => !prev)}
                  >
                    {darkMode ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </Card>
          </section>

          <aside className={styles.sideSection}>
            <Card>
              <div className={styles.summary}>
                <h3>Quick Summary</h3>
                <p>
                  Keep your settings updated to get the best experience on the
                  platform.
                </p>
                <ul>
                  <li>Profile visibility: {publicProfile ? "Public" : "Private"}</li>
                  <li>
                    Notifications: {notificationsEnabled ? "Enabled" : "Disabled"}
                  </li>
                  <li>Theme: {darkMode ? "Dark" : "Light"}</li>
                </ul>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default SettingScreen;
