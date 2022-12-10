--drop table expense;
--drop table category;
--drop table account;
--drop table account_type;
--drop table currency;
--drop table person;

CREATE TABLE PERSON (
	ID_USER SERIAL PRIMARY KEY,
	FIRST_NAME TEXT NOT NULL, 
	LAST_NAME TEXT NOT NULL, 
	USERNAME TEXT UNIQUE NOT NULL, 
	EMAIL TEXT UNIQUE NOT NULL, 
	PASSWORD TEXT NOT NULL
);
CREATE TABLE CURRENCY (
	ID_CURRENCY SERIAL PRIMARY KEY, 
	RATE NUMERIC NOT NULL, 
	SYMBOL TEXT, 
	NAME TEXT NOT NULL
);
create table account_type (
	id_type serial primary key, 
	name text not null
);
CREATE TABLE ACCOUNT (
	ID_ACCOUNT serial PRIMARY KEY, 
	account_number numeric not null,
	NAME TEXT NOT NULL, 
	BALANCE NUMERIC NOT NULL, 
	ID_CURRENCY SERIAL NOT NULL REFERENCES CURRENCY(ID_CURRENCY), 
	ID_USER SERIAL NOT NULL REFERENCES PERSON(ID_USER),
	id_type serial not null references account_type(id_type)
);
CREATE TABLE CATEGORY (
	ID_CATEGORY SERIAL PRIMARY KEY, 
	NAME TEXT NOT NULL
);
CREATE TABLE expense (
	id_expense SERIAL NOT NULL PRIMARY KEY, 
	expense_type TEXT NOT NULL, 
	expense_date DATE NOT NULL, 
	AMOUNT NUMERIC NOT NULL, 
	DESCRIPTION TEXT, 
	showDescription boolean default false,
	ORIGIN_ACCOUNT SERIAL NOT NULL REFERENCES ACCOUNT(ID_ACCOUNT), 
	TO_ACCOUNT SERIAL NOT NULL REFERENCES ACCOUNT(ID_ACCOUNT), 
	ID_CURRENCY SERIAL NOT NULL REFERENCES CURRENCY(ID_CURRENCY), 
	ID_CATEGORY SERIAL NOT NULL REFERENCES CATEGORY(ID_CATEGORY),
	ID_USER SERIAL NOT NULL REFERENCES PERSON(ID_USER)
);

INSERT INTO currency(name, rate) VALUES ('ABW', 1.79), ('AGO', 631.4419555), ('ALB', 103.52), ('AND', 0.8453765644), ('ARE', 3.6725), ('ARG', 94.99074167), ('ARM', 503.769675), ('ATG', 2.7), ('AUS', 1.33122426), ('AZE', 1.7), ('BDI', 1975.950881), ('BEN', 554.6025992), ('BFA', 554.530675), ('BGD', 85.08376325), ('BGR', 1.653775), ('BHR', 0.376), ('BHS', 1), ('BIH', 1.653606154), ('BLR', 2.538675), ('BLZ', 2), ('BMU', 1), ('BOL', 6.91), ('BRA', 5.39440079), ('BRB', 2), ('BRN', 1.343806963), ('BTN', 73.93934825), ('BWA', 11.08725833), ('CAF', 554.530675), ('CAN', 1.253876902), ('CHE', 0.9138458333), ('CHL', 758.9553787), ('CHN', 6.44897518), ('CIV', 554.530675), ('CMR', 554.530675), ('COD', 1989.391471), ('COG', 554.530675), ('COL', 3743.589819), ('COM', 415.9558491), ('CPV', 93.21809241), ('CRI', 620.78472), ('CUW', 1.79), ('CYM', 0.83333), ('CZE', 21.67816667), ('DJI', 177.721), ('DMA', 2.7), ('DNK', 6.287113083), ('DOM', 57.22111667), ('DZA', 135.0640583), ('ECU', 1), ('EGY', 15.64452728), ('EMU', 0.8454941389), ('ERI', 15.075), ('EUR', 1.05), ('FJI', 2.070633333), ('FSM', 1), ('GAB', 554.530675), ('GBR', 0.7270649447), ('GEO', 3.221558333), ('GHA', 5.8057), ('GIB', 0.7270649447), ('GMB', 51.48444388), ('GNB', 554.530675), ('GNQ', 554.530675), ('GRD', 2.7), ('GTM', 7.734388333), ('GUY', 208.5), ('HKG', 7.77325), ('HND', 24.01665532), ('HRV', 6.360083167), ('HTI', 89.22663651), ('HUN', 303.1408333), ('IDN', 14308.1439), ('IMN', 0.7270649447), ('IND', 73.91801282), ('IRN', 42000), ('IRQ', 1450), ('ISL', 126.9888602), ('ISR', 3.230198323), ('JOR', 0.71), ('JPN', 109.7543238), ('KAZ', 425.9075), ('KEN', 109.6377466), ('KGZ', 84.64082201), ('KHM', 4098.722795), ('KIR', 1.33122426), ('KNA', 2.7), ('KOR', 1143.951667), ('KWT', 0.3016431108), ('LAO', 9697.915789), ('LBN', 1507.5), ('LCA', 2.7), ('LSO', 14.77867821), ('MAC', 8.00553175), ('MAR', 8.988484024), ('MDA', 17.68046614), ('MDG', 3829.977849), ('MDV', 15.37269841), ('MEX', 20.27240833), ('MKD', 52.10215833), ('MLI', 554.530675), ('MNE', 0.8453765644), ('MNG', 2849.288615), ('MOZ', 65.465), ('MUS', 41.69213333), ('MYS', 4.143297598), ('NAM', 14.778675), ('NCL', 100.8802226), ('NER', 554.530675), ('NIC', 35.17101667), ('NOR', 8.59), ('NPL', 118.1340816), ('NRU', 1.33122426), ('NZL', 1.4138), ('OMN', 0.3845), ('PAK', 162.9062537), ('PAN', 1), ('PER', 3.880554131), ('PHL', 49.25459773), ('PLW', 1), ('PNG', 3.50877193), ('POL', 3.861916667), ('PRY', 6774.162735), ('PYF', 100.8802226), ('QAT', 3.64), ('ROU', 4.160416667), ('RUS', 73.65435), ('RWA', 988.6248066), ('SAU', 3.75), ('SEN', 554.530675), ('SGP', 1.343483333), ('SLB', 8.030102991), ('SLE', 10439.42533), ('SLV', 1), ('SMR', 0.8453765644), ('SRB', 99.39594167), ('SSD', 306.3546199), ('SUR', 18.23866667), ('SWE', 8.576566716), ('SWZ', 14.78343514), ('SXM', 1.79), ('SYC', 16.92052257), ('TCD', 554.530675), ('TGO', 554.530675), ('THA', 31.97709344), ('TJK', 11.30885), ('TLS', 1), ('TON', 2.264959601), ('TTO', 6.758530049), ('TUN', 2.794466667), ('TUR', 8.850407549), ('TZA', 2297.764226), ('UGA', 3587.051707), ('UKR', 27.28618938), ('URY', 43.554575), ('USA', 1), ('UZB', 10609.46439), ('VCT', 2.7), ('VNM', 23159.78259), ('VUT', 109.4525), ('WSM', 2.556092342), ('XKX', 0.8453765644), ('YEM', 1035.467186), ('ZAF', 14.77867821), ('ZMB', 20.01848659), ('ZWE', 88.55244726);

INSERT INTO category(name) VALUES ('Food & Drinks'), ('Shopping'), ('Housing'), ('Transportation'), ('Vehicle'), ('Life & Entertainment'), ('Communication, PC'), ('Financial expenses'), ('Investments'), ('Income'), ('Others');

INSERT INTO account_type(name) VALUES ('General'), ('Cash'), ('Current Account'), ('Credit Card'), ('Account with Overdraft'), ('Saving Account'), ('Bonus'), ('Insurance'), ('Investment'), ('Loan'), ('Mortgage'); 

insert into person (ID_USER, FIRST_NAME, LAST_NAME, USERNAME, EMAIL, PASSWORD) values (0, 'admin', 'admin', 'admin', 'admin', 'admin');
insert into account (ID_ACCOUNT, account_number, NAME, BALANCE, ID_CURRENCY, ID_USER, id_type) values(0, 0, 'account', 0, 155, 0, 2);

create or replace function exchange(amount numeric, id numeric)
returns numeric 
as 
$$
declare 
exchange_amount numeric;
begin
	select rate * amount into exchange_amount from currency where id_currency = id;
	return exchange_amount;
end;
$$ language plpgsql;

create or replace function dollars_exchange(amount numeric, id numeric)
returns numeric 
as 
$$
declare 
exchange_amount numeric;
begin
	select amount/rate into exchange_amount from currency where id_currency = id;
	return exchange_amount;
end;
$$ language plpgsql;