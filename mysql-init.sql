USE wanted;

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS `posts` (
    `post_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '게시글 ID ( PK )',
    `title` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '제목' COLLATE 'utf8mb4_general_ci',
    `content` TEXT NOT NULL COMMENT '내용' COLLATE 'utf8mb4_general_ci',
    `writer` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '작성자' COLLATE 'utf8mb4_general_ci',
    `password_hash` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '작성자 비밀번호' COLLATE 'utf8mb4_general_ci',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    PRIMARY KEY (`post_id`) USING BTREE,
    INDEX `idx_title` (`title`) USING BTREE,
    INDEX `idx_writer` (`writer`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS `comments` (
    `comment_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '댓글 ID ( PK )',
    `post_id` BIGINT(20) UNSIGNED NOT NULL COMMENT '게시글 ID ( posts.post_id )',
    `parent_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL COMMENT '부모 댓글 ID ( comments.comment_id )',
    `writer` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '작성자' COLLATE 'utf8mb4_general_ci',
    `content` VARCHAR(200) NOT NULL DEFAULT '' COMMENT '내용' COLLATE 'utf8mb4_general_ci',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    PRIMARY KEY (`comment_id`) USING BTREE,
    INDEX `post_id` (`post_id`) USING BTREE,
    INDEX `parent_id` (`parent_id`) USING BTREE,
    CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`comment_id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

-- 키워드 알림 테이블
CREATE TABLE IF NOT EXISTS `keyword_alerts` (
    `keyword_alert_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '키워드 알림 ID ( PK )',
    `writer` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '작성자' COLLATE 'utf8mb4_general_ci',
    `keyword` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '키워드' COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (`keyword_alert_id`) USING BTREE,
    UNIQUE INDEX `uq_writer_keyword` (`writer`, `keyword`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;


