import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { animes } from "@/services";

import { ISearch, IAnime, IAnimeResults } from "@/types";

const Home: React.FC = () => {
  const [anime, setAnime] = useState<IAnimeResults>({} as IAnimeResults);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<ISearch>();

  const onSubmit: SubmitHandler<ISearch> = (data: ISearch) => {
    setIsLoad(true);
    const { find } = data;
    animes
      .get(`search/anime?q=${find}`)
      .then((response) => {
        setAnime(response.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoad(false));
  };

  return (
    <div>
      <h1>Choose an anime</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Anime name"
          {...register("find", { required: true })}
        />
        <input type="submit" value="search" />
        <span>{errors.find && "informe o anime"}</span>
      </form>

      <hr />

      {isLoad ? (
        <div>
          <h1>Searching... please wait</h1>
        </div>
      ) : (
        <>
          {anime.results?.length <= 0 ? (
            <h3>You still haven't searched for anything...</h3>
          ) : (
            <>
              {anime?.results?.map((item) => (
                <div key={item.mal_id}>
                  <h3>{item.title}</h3>
                  <img src={item.image_url} alt={item.title} />
                  <p> "{item.synopsis}" </p>
                  <p>
                    {" "}
                    <b>Score: </b>
                    {item.score}{" "}
                  </p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
