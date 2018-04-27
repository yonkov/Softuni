using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Custom
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<string, int> dwarves = new Dictionary<string, int>();
            //helper dictionary that we use for sorting
            Dictionary<string, int> colors = new Dictionary<string, int>();

            string input = Console.ReadLine();

            while (input!="Once upon a time")
            {
                string[] inputParams = input
                    .Split(new string[] { " <:> " },
                    StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                string dwarf = inputParams[0];
                string color = "("+inputParams[1] + ")";
                int physics = int.Parse(inputParams[2]);

                string concat = color + " "+ dwarf;

                if (!dwarves.ContainsKey(concat))
                {
                    dwarves.Add(concat, physics);
                    if (!colors.ContainsKey(color))
                    {
                        colors.Add(color, 1);
                    }
                    else
                    {
                        colors[color]++;
                    }
                }
                else
                {
                    if (physics > dwarves[concat])
                        dwarves[concat] = physics;
                }
                
                input = Console.ReadLine();
            }
            foreach (var kvp in dwarves.OrderByDescending(x=>x.Value).ThenByDescending(x=>colors[x.Key.Split(new string[] { " " },
                    StringSplitOptions.RemoveEmptyEntries).First()]))
            {
                Console.WriteLine("{0} <-> {1}", kvp.Key, kvp.Value);
            }
        }
    }
}
