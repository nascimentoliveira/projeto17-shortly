--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "bigUrl" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: usersUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."usersUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usersUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersUrls_id_seq" OWNED BY public."usersUrls".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls" ALTER COLUMN id SET DEFAULT nextval('public."usersUrls_id_seq"'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 2, 'f2f82711-3899-43e9-873d-48334458787f', '2022-12-23 13:30:29.854907');
INSERT INTO public.sessions VALUES (2, 6, '3d8edc0a-fc2d-4f83-9fcd-ba631fd21453', '2022-12-23 13:39:38.25981');
INSERT INTO public.sessions VALUES (3, 5, '7a00e944-5083-4607-9ba1-046d53e826d3', '2022-12-23 13:41:21.057512');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://www.notion.so/bootcampra/Artigo-Deploy-de-aplica-es-back-end-no-Render-SQL-71b443543a4640b59f960101f3e09bca', '2022-12-23 13:31:27.741821');
INSERT INTO public.urls VALUES (2, 'https://www.notion.so/bootcampra/Materiais-5d1fe6e0d1764b0e94ed6b0a65827c98', '2022-12-23 13:31:58.807992');
INSERT INTO public.urls VALUES (3, 'https://www.notion.so/bootcampra/Ter-a-20-12-Corre-o-da-Pr-tica-Modelagem-Integridade-Repository-Pattern-e-Dump-com-Postgres-4495c9c0cd454bf5a047800e4cfae1f7', '2022-12-23 13:33:26.154163');
INSERT INTO public.urls VALUES (10, 'https://github.com/nascimentoliveira/projeto17-shortly', '2022-12-23 13:42:17.241147');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Maria', 'maria@driven.com.br', '$2b$12$.HlL9Z73fjTPhh2mnd/4zOMHmedhCai/2w1AqvZQuVuTT5axuZXoi', '2022-12-23 13:27:20.154426');
INSERT INTO public.users VALUES (2, 'Roseno', 'roseno@driven.com.br', '$2b$12$6PGrPhIER39q7Rn.WoSGVOKzn0DEvbrP.VNq623clrsQIl.rx9D3a', '2022-12-23 13:27:41.054138');
INSERT INTO public.users VALUES (3, 'Michel', 'michel@driven.com.br', '$2b$12$lxYEJj6uZ7SppGCaTI54/uc41vzKGHFT6OwMlWWXDD3LJGW4pYSza', '2022-12-23 13:28:11.751928');
INSERT INTO public.users VALUES (4, 'Pedrão', 'pedrao@driven.com.br', '$2b$12$lGdMyKS49g0CbvnWP5ajluRZe2BneMuPxz6Ha0kxCDyhOiosYAvMu', '2022-12-23 13:28:29.454312');
INSERT INTO public.users VALUES (5, 'Thiago', 'thiago@driven.com.br', '$2b$12$edlhBlqp1KKDIwZYZBSeledy6rWORAW1UOLRHr4ZLINyn2GNcD.wi', '2022-12-23 13:29:14.95935');
INSERT INTO public.users VALUES (6, 'João', 'joao@driven.com.br', '$2b$12$4MCTAplmIdf2UidSOeIiieAFQYnio4JcYMZG8SIPWLbTc/PFOOT52', '2022-12-23 13:29:59.061289');
INSERT INTO public.users VALUES (7, 'Roberto', 'roberto@driven.com.br', '$2b$12$rQIwOW3OhkukoELUolMdFeKkAw1so092DmmD0Y0TDl31LhKCW1Aw.', '2022-12-23 13:34:15.050562');
INSERT INTO public.users VALUES (8, 'Alberto', 'alberto@driven.com.br', '$2b$12$Ubf13FxYvcVgYPqXxvCyMutT5pxM9mKzIcTLy27leisFexJcwYoAO', '2022-12-23 13:34:42.956456');
INSERT INTO public.users VALUES (9, 'Yan', 'yan@driven.com.br', '$2b$12$5hfDc3/zwVdo6oftC5pTOe8whPYvs6plHtdaMGBWru7yZffTFLO2i', '2022-12-23 13:35:19.153722');
INSERT INTO public.users VALUES (10, 'Eduardo', 'edu@driven.com.br', '$2b$12$iIPOmCHg.OKZPIV8WKwD2Om5ME4byqDCSnUjIG037Te9rcLBPh/z2', '2022-12-23 13:35:58.652144');
INSERT INTO public.users VALUES (11, 'Roberta', 'roberta@driven.com.br', '$2b$12$haUp667Y9W5MyYFTiUFrEe9EohxNKWfVCxhEbcWQuKFqm4vsoqYSS', '2022-12-23 13:38:14.550299');


--
-- Data for Name: usersUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."usersUrls" VALUES (1, 2, 1, 'ha44firA', 0);
INSERT INTO public."usersUrls" VALUES (2, 2, 2, 'BMgVMfKZ', 6);
INSERT INTO public."usersUrls" VALUES (4, 2, 3, 'PyvoGaIE', 0);
INSERT INTO public."usersUrls" VALUES (5, 6, 1, 'nhcMwTkL', 0);
INSERT INTO public."usersUrls" VALUES (8, 6, 3, 'qpREkGb-', 3);
INSERT INTO public."usersUrls" VALUES (6, 6, 2, '1mDEd8gI', 1);
INSERT INTO public."usersUrls" VALUES (10, 5, 10, '0hV7Ky4x', 0);
INSERT INTO public."usersUrls" VALUES (9, 5, 1, '6sln-vR6', 1);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 10, true);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersUrls_id_seq"', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_bigUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_bigUrl_key" UNIQUE ("bigUrl");


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: usersUrls usersUrls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_pkey" PRIMARY KEY (id);


--
-- Name: usersUrls usersUrls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: usersUrls usersUrls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_fk0" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: usersUrls usersUrls_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_fk1" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO thiago;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

