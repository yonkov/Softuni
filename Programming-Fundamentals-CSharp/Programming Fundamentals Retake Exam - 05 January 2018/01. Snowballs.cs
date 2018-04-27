using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Numerics;

namespace SnowBalls
{
    class Program
    {
        static void Main(string[] args)
        {
            int snowballs = int.Parse(Console.ReadLine());

            int bestSnowballSnow = 0;
            int bestSnowballTime = 0;
            int bestSnowballQuality = 0;
            BigInteger bestSnowballValue = 0;

            for (int i = 0; i < snowballs; i++)
            {
                int currentSnowballSnow = int.Parse(Console.ReadLine());
                int currentSnowballTime = int.Parse(Console.ReadLine());
                int currentSnowballQuality = int.Parse(Console.ReadLine());
                BigInteger currentSnowballValue = BigInteger.Pow((currentSnowballSnow / currentSnowballTime), currentSnowballQuality);
                if (currentSnowballValue > bestSnowballValue)
                {
                    bestSnowballSnow = currentSnowballSnow;
                    bestSnowballTime = currentSnowballTime;
                    bestSnowballValue = currentSnowballValue;
                    bestSnowballQuality = currentSnowballQuality;
                }
            }
            Console.WriteLine("{0} : {1} = {2} ({3})", bestSnowballSnow, bestSnowballTime, bestSnowballValue, bestSnowballQuality);
        }
    }
}
