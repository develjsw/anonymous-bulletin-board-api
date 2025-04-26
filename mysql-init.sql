USE wanted;

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS `posts` (
    `postId` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '게시글 ID ( PK )',
    `title` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '제목' COLLATE 'utf8mb4_general_ci',
    `content` TEXT NOT NULL COMMENT '내용' COLLATE 'utf8mb4_general_ci',
    `writer` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '작성자' COLLATE 'utf8mb4_general_ci',
    `password` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '작성자 비밀번호' COLLATE 'utf8mb4_general_ci',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    PRIMARY KEY (`postId`) USING BTREE,
    INDEX `idx_title` (`title`) USING BTREE,
    INDEX `idx_writer` (`writer`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS `comments` (
    `commentId` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '댓글 ID ( PK )',
    `postId` INT UNSIGNED NOT NULL COMMENT '게시글 ID ( posts.postId )',
    `parentId` INT UNSIGNED NULL DEFAULT NULL COMMENT '부모 댓글 ID ( comments.commentId )',
    `writer` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '작성자' COLLATE 'utf8mb4_general_ci',
    `content` VARCHAR(200) NOT NULL DEFAULT '' COMMENT '내용' COLLATE 'utf8mb4_general_ci',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    PRIMARY KEY (`commentId`) USING BTREE,
    INDEX `postId` (`postId`) USING BTREE,
    INDEX `parentId` (`parentId`) USING BTREE,
    CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `comments` (`commentId`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

-- 키워드 알림 테이블
CREATE TABLE IF NOT EXISTS `keyword_alerts` (
    `keywordAlertId` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '키워드 알림 ID ( PK )',
    `writer` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '작성자' COLLATE 'utf8mb4_general_ci',
    `keyword` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '키워드' COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (`keywordAlertId`) USING BTREE,
    UNIQUE INDEX `uq_writer_keyword` (`writer`, `keyword`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

-- 1) posts 테이블에 fulltext 인덱스 달기 (ngram 파서 사용)
ALTER TABLE posts
    ADD FULLTEXT INDEX ft_posts_title_content (title, content)
    WITH PARSER ngram;

-- 2) comments 테이블에 fulltext 인덱스 달기 (content 만 색인)
ALTER TABLE comments
    ADD FULLTEXT INDEX ft_comments_content (content)
    WITH PARSER ngram;

