using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            //take an input line as string
            string input = Console.ReadLine();
            //List with all the numbers
            List <int> sequence = new List<int>();
            //List with all the words
            List <string> words = new List<string>();

            while (input!="Visual Studio crash")
            {
                // split the input line to list of numbers
                List<int> inputParams = input
                .Split(new char[] { ' ' },
                StringSplitOptions.RemoveEmptyEntries)
                .Select(int.Parse).ToList();
                //Loop through all the numbers from the list and add them to one big list. Do that for all the input lines.
                foreach (var element in inputParams)
                {
                    sequence.Add(element);
                }
                input =Console.ReadLine();
            }
            // Loop through all elements of the list
            for (int i = 0; i < sequence.Count - 2; i++)
            {
                //If there are consecutive elements 32656, 19759, 32763
                if (sequence[i] == 32656 && sequence[i + 1] == 19759 && sequence[i + 2] == 32763)
                {
                    StringBuilder sb = new StringBuilder();
                    //Locate string length
                    int wordLength = sequence[i + 4];
                    //Use helper list to take the asci values of the chars 
                    List<int> helper = sequence.Skip(i + 6).Take(wordLength).ToList();
                    //Loop through the list and convert the asci values of each number to char
                    foreach (int c in helper)
                    {
                        sb.Append((char)c);
                    }
                    //Add the converted string to the list with words
                    words.Add(sb.ToString());
                }
            }
            //Print all the words
            foreach (var word in words)
            {
                Console.WriteLine(word);
            }

        }
    }
}
