gapminder <- read_csv(file="gapminder_clean.csv")
gapminder <- as_tibble(gapminder)
filtered_data <- filter(gapminder, Year==1962, `Country Name`!= "Kuwait")
ggplot(data = filtered_data) +
  geom_point(mapping = aes(x = `CO2 emissions (metric tons per capita)`, 
                           y = `gdpPercap`, color=`continent`))
pearson <- cor.test(filtered_data$`CO2 emissions (metric tons per capita)`, 
                    filtered_data$`gdpPercap`, 
                    method = "pearson")
unfiltered_data <- filter(gapminder, Year!=1962, `Country Name`!= "Kuwait", `gdpPercap` != "NA",`CO2 emissions (metric tons per capita)` != "NA") %>%
group_by(Year) %>%
summarise(COR=cor(`CO2 emissions (metric tons per capita)`,`gdpPercap`, method = "pearson")) %>%
arrange(desc(COR)) %>%
slice_head(n=1)
unfiltered_data
        
