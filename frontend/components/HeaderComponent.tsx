import React from 'react';
import styles from './header.module.css';
import search_styles from './search_header.module.css';
import { UserOutlined, SearchOutlined, LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

export function HeaderComponent() {
    return (
        <header id={styles.header}>
            <div className={styles.container}>
                <div className={styles['left-box']}>
                    <Link href={"/mypage"}><UserOutlined className={styles['my-page']} /></Link>
                </div>
                <div className={styles.logo}>
                    <Link href={"/"}>
                        <img src="logo.png" alt="" />
                    </Link>
                </div>
                <div className={styles['right-box']}>
                    <Link href={"/search"}><SearchOutlined className={styles['search']} /></Link>
                </div>
            </div>
        </header>
    );
}

export function SubMenu() {
    return (
        <div id='subMenu'>
            <div className="container"></div>
        </div>
    );
}

export function SearchHeader() {
    return (
        <div id={search_styles.searchHeader}>
            <div className={search_styles.container}>
                <div className={search_styles.gap}>
                    <button onClick={() => history.go(-1)} className={search_styles['go-back']}>
                        <LeftOutlined className={search_styles['go-back-svg']} />
                    </button>
                    <div className={search_styles['search-box']}>
                        <label htmlFor="">
                            <SearchOutlined className={search_styles['search-icon']} />
                        </label>
                        <input type="text" placeholder='검색어를 입력해 주세요.' />
                    </div>
                </div>
            </div>
        </div>
    );
}