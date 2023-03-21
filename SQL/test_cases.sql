Insert into user values(0,'root','123456',0);
Insert into user values(1,'bus','123456',1);

Insert into food_type values(1,'主食');
Insert into food_type values(2,'小炒');
Insert into food_type values(3,'酒水');

Insert into food values(1,1,'白米饭',2.0);
Insert into food values(2,2,'番茄炒蛋',12.5);
Insert into food values(3,2,'炒青菜',12.5);

Insert into tablee values(1,'六人桌',0);
Insert into tablee values(2,'单人桌',1);

Insert into orderr values('测试1',1, '2021-12-20',0,0);
Insert into orderr values('测试2',1, '2020-12-20',1000.3,0);

Insert into order_detai values('测试1点菜1', '测试1',1, 1,2);
Insert into order_detai values('测试1点菜2', '测试1',2, 1,6666);
Insert into order_detai values('测试2点菜1', '测试2',3, 55,78);