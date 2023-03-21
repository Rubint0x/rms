CREATE TABLE user  (
  `u_id` int(10) NOT NULL,
  `username` varchar(20),
  `pwd` varchar(20),
  `type` int(1),
  PRIMARY KEY (`u_id`)
); 

CREATE TABLE food_type (
  `ty_id` int(10) NOT NULL,
  `ty_name` varchar(20),
  PRIMARY KEY (`ty_id`)
);

CREATE TABLE food  (
  `f_id` int(10) NOT NULL,
  `ty_id` int(10) NOT NULL,
  `f_name` varchar(50),
  `price` float(8, 2),
  PRIMARY KEY (`f_id`),
  FOREIGN KEY (`ty_id`) REFERENCES food_type (`ty_id`)
);

CREATE TABLE tablee  (
  `t_id` int(10) NOT NULL,
  `type` varchar(20),
  `state` int(1),
  PRIMARY KEY (`t_id`)
);

CREATE TABLE orderr (
  `o_id` varchar(30) NOT NULL,
  `t_id` int(10) NOT NULL,
  `date` date,
  `sum` float(8, 2),
  `statue` int(1),
  PRIMARY KEY (`o_id`),
  FOREIGN KEY (`t_id`) REFERENCES tablee (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE order_detai  (
  `d_id` varchar(30) NOT NULL,
  `o_id` varchar(30) NOT NULL,
  `f_id` int(10) NOT NULL,
  `count` int(3),
  `cost` float(8, 2),
  PRIMARY KEY (`d_id`),
  FOREIGN KEY (`o_id`) REFERENCES orderr (`o_id`),
  FOREIGN KEY (`f_id`) REFERENCES food (`f_id`)
);
