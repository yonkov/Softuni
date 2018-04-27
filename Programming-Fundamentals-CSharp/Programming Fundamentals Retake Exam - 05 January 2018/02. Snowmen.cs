using System;
using System.Collections.Generic;
using System.Linq;

class Snowman
{
    static void Main()
    {
        List<int> sequence = Console.ReadLine()
                .Split(new char[] { ' ' },
                StringSplitOptions.RemoveEmptyEntries)
                .Select(int.Parse).ToList();

        HashSet<int> losers = new HashSet<int>();
        while (true)
        {
            for (int i = 0; i < sequence.Count; i++)
            {
                int attacker = i;
                int target = sequence[i];
                if (target>=sequence.Count)
                {
                    target = sequence[i] % sequence.Count;
                }
                int difference = Math.Abs(attacker - target);

                if (sequence.Count-losers.Count==1)
                {
                    return;
                }

                if (losers.Contains(attacker))
                {
                    continue;
                }
                if (difference == 0)
                {
                    Console.WriteLine("{0} performed harakiri", attacker);
                    losers.Add(target);
                }
                else if (difference % 2 == 0)
                {
                    Console.WriteLine("{0} x {1} -> {0} wins", attacker, target);
                    losers.Add(target);
                }
                else if (difference % 2 == 1)
                {
                    Console.WriteLine("{0} x {1} -> {1} wins", attacker, target);
                    losers.Add(attacker);
                }
            }
            foreach (var item in losers.OrderByDescending(x=>x))
            {
                sequence.RemoveAt(item);
            }
            losers.Clear();
        }
        
    }
}
