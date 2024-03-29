CREATE TABLE users (id VARCHAR(64) NOT NULL PRIMARY KEY, username VARCHAR(64) NOT NULL UNIQUE, password VARCHAR(64) NOT NULL)
CREATE TABLE cameras (id VARCHAR(6) NOT NULL PRIMARY KEY, filter VARCHAR(64) NOT NULL DEFAULT 'auto', quality DECIMAL(3) UNSIGNED NOT NULL DEFAULT 100, rotation DECIMAL(3) UNSIGNED NOT NULL DEFAULT 0, timestamp DATETIME)
CREATE TABLE subscriptions (id VARCHAR(64) NOT NULL PRIMARY KEY, name VARCHAR(64) NOT NULL, user_id VARCHAR(64) NOT NULL, camera_id VARCHAR(6) NOT NULL, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT, CONSTRAINT fk_camera_id FOREIGN KEY (camera_id) REFERENCES cameras (id) ON DELETE CASCADE ON UPDATE RESTRICT)
CREATE TABLE filters (id VARCHAR(64) NOT NULL PRIMARY KEY, label VARCHAR(64) NOT NULL)

INSERT INTO filters (id, label) VALUES ('auto', 'cameras.detail.filters.auto')
INSERT INTO filters (id, label) VALUES ('night', 'cameras.detail.filters.night')
INSERT INTO filters (id, label) VALUES ('backlight', 'cameras.detail.filters.backlight')
INSERT INTO filters (id, label) VALUES ('spotlight', 'cameras.detail.filters.spotlight')
INSERT INTO filters (id, label) VALUES ('sports', 'cameras.detail.filters.sports')
INSERT INTO filters (id, label) VALUES ('snow', 'cameras.detail.filters.snow')
INSERT INTO filters (id, label) VALUES ('beach', 'cameras.detail.filters.beach')
INSERT INTO filters (id, label) VALUES ('verylong', 'cameras.detail.filters.verylong')
INSERT INTO filters (id, label) VALUES ('fireworks', 'cameras.detail.filters.fireworks')