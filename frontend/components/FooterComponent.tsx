import React from 'react';
import styles from './footer.module.css';
export function FooterComponent() {
    return (
        <footer id={styles.footer}>
            <div className={styles.container}>
                <div className={styles['left-box']}>
                    <img src="logo.png" alt="" />
                    <span>먹고 저장하자!<br />SaveEat</span>
                </div>
                <div className={styles["right-box"]}>
                    <div className={styles["git-hub-box"]}>
                        <div className={styles.git_hub_icon} >
                            <img src="github-mark.svg" alt="" />
                            <img src="GitHub_Logo.png" alt="" />
                        </div>
                        <span></span>
                    </div>
                    <div className={styles['inform-Use']}>
                        <a className={styles['terms-of-use']} href="!#">이용약관</a>
                        <a className={styles['privacy-policy']} href="!#">개인정보처리방침</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}