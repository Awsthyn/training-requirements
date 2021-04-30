# Answers to questions from "Linux for Bioinformatics"

Q1. What is your home directory?

A: `/home/ubuntu`

Q2. What is the output of this command?

A: `hello_world.txt`

Q3. What is the output of each ls command?

A:
```
./my_folder:

./my_folder2:
hello_world.txt
```

Q4. What is the output of each?

A:
```
./my_folder:

./my_folder2:

./my_folder3:
hello_world.txt
```

Q5. Why didn't that work?

A: I had an SSH key pair on my local computer, but on the remote server, the public key needs to be copied to a file within the user’s home directory at `/home/sudouser/.ssh/authorized_keys.`

Q6. What was the solution? 

A: I copied the content's `authorized_keys` file from `/home/ubuntu/.ssh/` to `/home/sudouser/.ssh/`

Q7. what does the sudo docker run part of the command do? and what does the salmon swim part of the command do?

A: The docker `run` command first creates a writeable container layer over the specified image, and then starts it using the specified command
The `salmon swim` command performs super-secret operation... prints on terminal:

```
    _____       __
   / ___/____ _/ /___ ___  ____  ____
   \__ \/ __ `/ / __ `__ \/ __ \/ __ \
  ___/ / /_/ / / / / / / / /_/ / / / /
 /____/\__,_/_/_/ /_/ /_/\____/_/ /_/
```

Q8. What is the output of this command?

A:
`serveruser is not in the sudoers file.  This incident will be reported.`

Q9. what does -c bioconda do? 

A: it adds a custom channel to search for packages. In this case, bioconda.

Q10. What does the -o athal.ga.gz part of the command do?

A: It saves the FTP response in a file named athal.ga.gz 

Q11. What is a .gz file?

A: A GZ file is an archive file compressed by the standard GNU zip (gzip) compression algorithm. 

Q12. What does the zcat command do? 

A: The zcat command lets you view contents of a compressed file. 

Q13. What does the head command do? 

A: the head command outputs the first part of files. (default: 10 lines)

Q14. What does the number 100 signify in the command?

A: It shows the first 100 lines of the file. (-n flag)

Q15. What is | doing?

A: It uses the output from the left command as input to the right command. Very used to create pipelines.

Q16. What format are the downloaded sequencing reads in?

A: SRA format.

Q17. What is the total size of the disk?

A: 7.7 Gigabytes.

Q18. How much space is remaining on the disk?

A: 2.9 Gigabytes.

Q19. What went wrong? 

A: There is not enough space in disk.

Q20: What was your solution?

A: I used the flag --gzip to compress the converted file.
