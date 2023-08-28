import styles from './style.module.css'
export function MypageComponent1() {
    // 컴포넌트 => Element를 반환하는 함수
    // Element는 Component 결과
    return (
        <div id={styles.myPage}>
            <div className={styles.container}>
                <ul className={styles["mypage-list"]}>
                    <li className={styles["user-info"]}>
                        <ul>
                            <li className={styles["user-name"]}>
                                <h2>뭉탱이</h2>
                            </li>
                            <li className={styles["user-email-box"]}>
                                <p className={styles["user-email"]}>
                                    mongtang@igonan.com
                                </p>
                            </li>
                            <li className={styles["save-foot-count"]}>
                                <strong>지금까지 기록한 음식 <em>-3000</em>개</strong>
                            </li>
                        </ul>
                    </li>
                    <li className={styles["change-food-category"]}>
                        <button className={styles["change-food-category-btn"]}>
                            <span>음식 분류 수정</span>
                        </button>
                    </li>
                    <li className={styles["user-update-box"]}>
                        <button className={styles["change-user"]}>
                            <span>회원정보 수정</span>
                        </button>
                    </li>
                    <li className={styles["logout-box"]}>
                        <button className={styles["logout"]}>
                            <span>로그아웃</span>
                        </button>
                    </li>
                </ul>
                <div className={styles["withdrawal-btn-box"]}>
                    <button className={styles["user-withdrawal-btn"]}>
                        <h6>회원탈퇴</h6>
                    </button>
                </div>
            </div>
        </div>
    );
};
export function MypageComponent2() {
    return (
        <div>
            <h1>마이페이지 입니다.</h1>
        </div>
    );
};