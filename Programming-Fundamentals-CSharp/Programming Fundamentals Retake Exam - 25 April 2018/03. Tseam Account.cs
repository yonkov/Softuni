using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task_3_Tseam_Account
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> account = Console.ReadLine()
                    .Split(new string[] { " " },
                    StringSplitOptions.RemoveEmptyEntries)
                    .ToList();

            string input = Console.ReadLine();

            while (input!="Play!")
            {
                string[] commands = input
                    .Split(new string[] { " " },
                    StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                string game = commands[1];

                if (commands[0]=="Install")
                {
                    if (!account.Contains(game))
                    {
                        account.Add(game);
                    }
                }
                else if (commands[0]=="Uninstall")
                {
                    if (account.Contains(game))
                    {
                        account.Remove(game);
                    }
                }
                else if (commands[0]=="Update")
                {
                    if (account.Contains(game))
                    {
                        string updatedGame = game;
                        account.Remove(game);
                        account.Add(game);
                    }
                }
                else if (commands[0] == "Expansion")
                {                   
                    string expansionGame = game
                        .Split(new char[] { '-'},
                        StringSplitOptions.RemoveEmptyEntries)
                        .First();

                    string extension = game
                        .Split(new char[] { '-' },
                        StringSplitOptions.RemoveEmptyEntries)
                        .Last();

                    if (account.Contains(expansionGame))
                    {
                        int index = account.IndexOf(expansionGame);
                        account.Insert(index+1, expansionGame + ":"+extension);
                    }
                }
                input = Console.ReadLine();
            }
            Console.WriteLine(String.Join(" ", account));
        }
    }
}
