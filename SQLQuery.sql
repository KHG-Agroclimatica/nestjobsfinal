create database testing

use testing

create table colors
(
	id int primary key identity,
	name varchar(50)
)

insert into colors
values('red'),('pink'),('orange')

create view vw_getall_colors
as
select * from colors
