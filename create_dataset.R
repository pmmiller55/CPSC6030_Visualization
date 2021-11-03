#g15 Data Visualization Paige Miller
#11/2/2021
#Data Cleaning

#load in csv files
#the files were orginially organized by nodes and the values for the different
#measurements were all in the same file
#I split the files by the different measurements and will use R
#to combine them by date, and then transpose them so the nodes are rows
#and the timestamps are columns

#set working directory
#setwd("/Users/mille/Project")

#library
#library(readr)

#load in csv files
eastA_A <- read.csv("eastA_A.csv", header = TRUE)
eastA_kVA <- read.csv("eastA_kVA.csv")
eastA_kW <- read.csv("eastA_kW.csv")
eastA_power <- read.csv("eastA_power.csv")

eastB_A <- read.csv("eastB_A.csv")
eastB_kVA <- read.csv("eastB_kVA.csv")
eastB_kW <- read.csv("eastB_kW.csv")
eastB_power <- read.csv("eastB_power.csv")

westA_A <- read.csv("westA_A.csv")
westA_kVA <- read.csv("westA_kVA.csv")
westA_kW <- read.csv("westA_kW.csv")
westA_power <- read.csv("westA_power.csv")

mcssA_A <- read.csv("mcssA_A.csv")
mcssA_kVA <- read.csv("mcssA_kVA.csv")
mcssA_kW <- read.csv("mcssA_kW.csv")
mcssA_power <- read.csv("mcssA_power.csv")

mcssB_A <- read.csv("mcssB_A.csv")
mcssB_kVA <- read.csv("mcssB_kVA.csv")
mcssB_kW <- read.csv("mcssB_kW.csv")
mcssB_power <- read.csv("mcssB_power.csv")

# merge the kVA files based on timestamp
kVA <- merge(eastA_kVA, eastB_kVA, by="Timestamp", all=T)
kVA <- merge(kVA, westA_kVA, by="Timestamp", all=T)
kVA <- merge(kVA, mcssA_kVA, by="Timestamp", all=T)
kVA <- merge(kVA, mcssB_kVA, by="Timestamp", all=T)

# merge the A files based on timestamp
A <- merge(eastA_A, eastB_A, by="Timestamp", all=T)
A <- merge(A, westA_A, by="Timestamp", all=T)
A <- merge(A, mcssA_A, by="Timestamp", all=T)
A <- merge(A, mcssB_A, by="Timestamp", all=T)

#merge the kW files based on timestamp
kW <- merge(eastA_kW, eastB_kW, by="Timestamp", all=T)
kW <- merge(kW, westA_kW, by="Timestamp", all=T)
kW <- merge(kW, mcssA_kW, by="Timestamp", all=T)
kW <- merge(kW, mcssB_kW, by="Timestamp", all=T)

#merge the power files based on timestamp
pow <- merge(eastA_power, eastB_power, by="Timestamp", all=T)
pow <- merge(pow, westA_power, by="Timestamp", all=T)
pow <- merge(pow, mcssA_power, by="Timestamp", all=T)
pow <- merge(pow, mcssB_power, by="Timestamp", all=T)

#to load the data into javascript for use in d3
#we want the nodes to be the rows
#so transpose
#A <- t(A)
#kVA <- t(kVA)
kW <- t(kW)
pow <- t(pow)

# clean up transposed data set by removing the empty column
A <- subset(A, select = -c(1))
kVA <- subset(kVA, select = -c(1))
kW <- subset(kW, select = -c(1))
pow <- subset(pow, select = -c(1))

#write the data back to csv files and finish editing there
#remove the first row to get rid of the column names
#change timestamp to nodes

write.csv(A, "A.csv")
write.csv(kVA, "kVA.csv")
write.csv(kW, "kW.csv")
write.csv(pow, "pow.csv")