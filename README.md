# Ecuación de Tiempo

Displays the **Equation of Time** for arbitrary values of orbital inclination and eccentricity.

Try it at <https://lopezsolerluis.github.io/ecuacion-de-tiempo/publicado/>

![Captura de pantalla](https://github.com/lopezsolerluis/ecuacion-de-tiempo/blob/master/resources/public/captura.png?raw=true)

## Background

I deeply recommend the analysis of the problem elaborated here: <https://astronomy.stackexchange.com/questions/47349/equation-of-time-with-arbitrary-eccentricity-and-obliquity>

## Contact

I'm absolutely sure you have no time at all for sending suggestions, advices nor comments; not even threatens. But, who knows? In any case, here is my email: `llopez at cnba uba ar`.

## Development (for *casi-hackers* only)

To get an interactive development environment run:

    clojure -A:fig:build

To clean all compiled files:

    rm -rf target/public

To create a production build run:

	rm -rf target/public
	clojure -A:fig:min


## License

There is none.
