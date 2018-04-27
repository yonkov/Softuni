using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Task_3
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            string decrypted = "";
            List<string> attacked = new List<string>();
            List<string> destroyed = new List<string>();
            int attackedCount = 0;
            int destroyedCount = 0;
            for (int i = 0; i < n; i++)
            {
                int key = 0;
                string input = Console.ReadLine();
                Regex keyRegex = new Regex(@"[starSTAR]");
                MatchCollection matches = keyRegex.Matches(input);
                key = matches.Count;
                StringBuilder sb = new StringBuilder();
                char newLetter = ' ';
                foreach (char letter in input)
                {
                    newLetter = (char)(letter - key);
                    sb.Append(newLetter);
                }
                decrypted = sb.ToString();
                Regex linePattern = new Regex(@"\@([a-zA-Z]+)[^@\-!:>]*\:([0-9]+)[^@\-!:>]*\!(A|D)\![^@\-!:>]*\-\>[0-9]+");
                if (linePattern.Match(decrypted).Success)
                {
                    string planet = linePattern.Match(decrypted).Groups[1].Value;
                    string attack = linePattern.Match(decrypted).Groups[3].Value;

                    if (attack.Equals("A"))
                    {
                        attacked.Add(planet);
                        attackedCount++;
                    }
                    else if (attack.Equals("D"))
                    {
                        destroyed.Add(planet);
                        destroyedCount++;
                    }
                }
            }
            Console.WriteLine($"Attacked planets: {attackedCount}");
            foreach (var planet in attacked.OrderBy(x=>x))
            {
                Console.WriteLine($"-> {planet}");
            }
            Console.WriteLine($"Destroyed planets: {destroyedCount}");
            foreach (var planet in destroyed.OrderBy(x => x))
            {
                Console.WriteLine($"-> {planet}");
            }
        }
    }
}
