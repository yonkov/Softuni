using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForceSide
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();
            Dictionary<string, List<string>> sidesWithUsers = new Dictionary<string, List<string>>();
            List<string> users = new List<string>();
            while (input!="Lumpawaroo")
            {
                if (input.Contains("|"))
                {
                    string[] inputParams = input
                    .Split(new string[] { " | " },
                    StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                    string side = inputParams[0];
                    string user = inputParams[1];

                    if (!sidesWithUsers.ContainsKey(side))
                    {
                        if (!users.Contains(user))
                        {
                            sidesWithUsers.Add(side, new List<string>() { user });
                            users.Add(user);
                        }
                    }
                    else
                    {
                        if (!users.Contains(user))
                        {
                            sidesWithUsers[side].Add(user);
                            users.Add(user);
                        }
                    }
                    users.Add(user);
                }
                else if (input.Contains("->"))
                {
                    string[] inputParams = input
                    .Split(new string[] { " -> " },
                    StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                    string side = inputParams[1];
                    string user = inputParams[0];

                    if (!users.Contains(user))
                    {
                        if (!sidesWithUsers.ContainsKey(side))
                        {
                            sidesWithUsers.Add(side, new List<string>());
                        }
                        sidesWithUsers[side].Add(user);
                        Console.WriteLine("{0} joins the {1} side!", user, side);
                        users.Add(user);   
                    }
                    else
                    {
                        string getUser = sidesWithUsers.First(x=>x.Value.Contains(user)).Key;

                        sidesWithUsers[getUser].Remove(user);

                        if (!sidesWithUsers.ContainsKey(side))
                        {
                            sidesWithUsers.Add(side, new List<string>());
                        }
                            sidesWithUsers[side].Add(user);
                        Console.WriteLine("{0} joins the {1} side!", user, side);
                    }   
                }                
                input = Console.ReadLine();
            }

            Dictionary<string, List<string>> sorted = sidesWithUsers.OrderByDescending(x => x.Value.Count()).ThenBy(x=>x.Key).ToDictionary(x => x.Key, x => x.Value);

            foreach (var side in sorted)
            {
                if (side.Value.Any())
                {
                    Console.WriteLine("Side: {0}, Members: {1}", side.Key, side.Value.Count());
                    foreach (var user in side.Value.OrderBy(x=>x))
                    {
                        Console.WriteLine("! {0}", user);
                    }
                }
            }
        }
    }
}
